/* eslint-disable @next/next/no-img-element */
"use client";
import { Alert, Button, Divider, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { api } from "~/trpc/react";
import * as Yup from "yup";
import type { AlertMessage } from "types/utils";
import type { User } from "@prisma/client";

interface AdminFormProps {
  user?: User;
}

const dataSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const AdminForm = ({ user }: AdminFormProps) => {
  const [message, setMessage] = useState<AlertMessage | null>(null);
  const createMutation = api.user.create.useMutation();
  const updateMutation = api.user.update.useMutation();
  const deleteMutation = api.user.delete.useMutation();
  const formik = useFormik({
    initialValues: {
      name: user?.name ?? "",
      username: user?.username ?? "",
      password: "",
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
          onSuccess: () => {
            setMessage({
              type: "success",
              message: "User created successfully",
            });
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
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
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
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AdminForm;
