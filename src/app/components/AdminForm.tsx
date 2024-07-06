/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Alert,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { api } from "~/trpc/react";
import * as Yup from "yup";
import type { AlertMessage } from "types/utils";
import type { User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface AdminFormProps {
  user?: User;
}

const dataSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().optional(),
  role: Yup.string().required("Role is required"),
});

const AdminForm = ({ user }: AdminFormProps) => {
  const router = useRouter();
  const [message, setMessage] = useState<AlertMessage | null>(null);
  const createMutation = api.user.create.useMutation();
  const updateMutation = api.user.update.useMutation();
  const deleteMutation = api.user.delete.useMutation();
  const formik = useFormik({
    initialValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      password: "",
      role: user?.role ?? "ADMIN",
    },
    validationSchema: dataSchema,
    onSubmit: (values) => {
      if (user) {
        setMessage({
          type: "info",
          message: "Updating user...",
        });

        updateMutation.mutate(
          { id: user.id, ...values },
          {
            onSuccess: () => {
              setMessage({
                type: "success",
                message: "User updated successfully",
              });
            },
            onError: (error) => {
              setMessage({
                type: "error",
                message: error.message,
              });
            },
          },
        );
      } else {
        setMessage({
          type: "info",
          message: "Creating user...",
        });

        createMutation.mutate(values, {
          onSuccess: ({ id }) => {
            setMessage({
              type: "success",
              message: "User created successfully",
            });

            setTimeout(() => {
              router.push(`/dashboard/admin/${id}`);
            }, 1000);
          },
          onError: (error) => {
            setMessage({
              type: "error",
              message: error.message,
            });
          },
        });
      }
    },
  });

  const handleDelete = () => {
    if (!user) return;
    setMessage({
      type: "info",
      message: "Deleting user...",
    });

    deleteMutation.mutate(user?.id, {
      onSuccess: () => {
        setMessage({
          type: "success",
          message: "User deleted successfully",
        });
        setTimeout(() => {
          router.push("/dashboard/admin");
        }, 1000);
      },
      onError: (error) => {
        setMessage({
          type: "error",
          message: error.message,
        });
      },
    });
  };
  return (
    <div className="mt-4 flex flex-col space-y-4 rounded-lg bg-white p-4 text-gray-600">
      <div className="flex flex-row items-center justify-between">
        <p className="text-xl font-bold">{user ? "Edit" : "Create"} Admin</p>
        {user && (
          <Button
            variant="contained"
            color="error"
            className="w-24 self-end justify-self-end rounded-lg"
            size="small"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </div>
      <Divider />
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        {message && (
          <Alert severity={message.type} onClose={() => setMessage(null)}>
            {message.message}
          </Alert>
        )}

        <TextField
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          size="small"
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          size="small"
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          size="small"
          type="password"
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="status">Role</InputLabel>
          <Select
            value={formik.values.role}
            onChange={formik.handleChange}
            label="Role"
            size="small"
            id="role"
            name="role"
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="USER">User</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AdminForm;
