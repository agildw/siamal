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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import ContentEditor from "./ContentEditor";
import { useState } from "react";
import { api } from "~/trpc/react";
import * as Yup from "yup";
import type { AlertMessage } from "types/utils";
import { useRouter } from "next/navigation";
import type { CampaignWithDonationsAndUser } from "types/campaign";
import { DataGrid } from "@mui/x-data-grid";
import type { Donation, DonationStatus } from "@prisma/client";
import { handleAmount } from "../utils/util";
import StatusChip from "./StatusChip";

interface CampaignFormProps {
  userId: string;
  campaign?: CampaignWithDonationsAndUser;
}

const dataSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  thumbnail: Yup.string().required("Thumbnail is required"),
  target: Yup.number().required("Target is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date().required("End Date is required"),
  status: Yup.string().required("Status is required"),
  url: Yup.string().required("URL is required"),
});

const dateFormattingOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderDate(checkTimeAndDate: any) {
  if (!checkTimeAndDate) {
    return "";
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return new Date(checkTimeAndDate).toLocaleDateString(
    "id-ID",
    dateFormattingOptions,
  );
}

const DonationList = ({ donations }: { donations: Donation[] }) => {
  return (
    <div className="h-[30rem] w-full">
      <DataGrid
        rows={donations}
        columns={[
          // hide
          { field: "id", headerName: "ID" },
          {
            field: "user",
            headerName: "Donor",
            width: 200,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            valueGetter: (params: any) => {
              console.log(params);
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              return params?.name ? params?.name : "-";
            },
          },
          {
            field: "amount",
            headerName: "Amount",
            width: 150,
            renderCell: (params) => (
              <p>Rp{handleAmount(params.value as number)}</p>
            ),
          },
          {
            field: "status",
            headerName: "Status",
            width: 150,
            renderCell: (params) => (
              <StatusChip status={params.value as DonationStatus} />
            ),
          },
          { field: "paymentMethod", headerName: "Payment Method", width: 200 },
          {
            field: "createdAt",
            headerName: "Created At",
            width: 200,

            renderCell: (params) => renderDate(params.value),
          },
        ]}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
      />
    </div>
  );
};

const CampaignForm = ({ userId, campaign }: CampaignFormProps) => {
  const router = useRouter();
  const [content, setContent] = useState<string | undefined>(
    campaign?.description,
  );
  const [message, setMessage] = useState<AlertMessage | null>(null);
  const createMutation = api.campaign.create.useMutation();
  const updateMutation = api.campaign.update.useMutation();
  const deleteMutation = api.campaign.delete.useMutation();

  const formik = useFormik({
    initialValues: {
      title: campaign?.title ?? "",
      thumbnail: campaign?.thumbnail ?? "/logo.png",
      target: campaign?.target ?? 0,
      startDate: campaign?.startDate ? moment(campaign.startDate) : moment(),
      endDate: campaign?.endDate
        ? moment(campaign.endDate)
        : moment().add(1, "days"),
      status: campaign?.status ?? "ACTIVE",
      url: campaign?.url ?? "",
    },
    validationSchema: dataSchema,
    onSubmit: (values) => {
      if (campaign) {
        setMessage({
          type: "info",
          message: "Updating campaign...",
        });

        updateMutation.mutate(
          {
            ...values,
            description: String(content),
            startDate: values.startDate.toDate(),
            endDate: values.endDate.toDate(),
            id: campaign.id,
          },
          {
            onSuccess: () => {
              setMessage({
                type: "success",
                message: "Campaign updated successfully",
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
          message: "Creating campaign...",
        });

        createMutation.mutate(
          {
            ...values,
            description: String(content),
            startDate: values.startDate.toDate(),
            endDate: values.endDate.toDate(),
            userId,
          },
          {
            onSuccess: () => {
              setMessage({
                type: "success",
                message: "Campaign created successfully",
              });
              setTimeout(() => {
                void router.push("/dashboard/campaigns");
              }, 1500);
              // setContent("");
              // formik.resetForm();
            },
            onError: (error) => {
              setMessage({
                type: "error",
                message: error.message,
              });
            },
          },
        );
      }
    },
  });

  const handleDelete = () => {
    if (campaign) {
      setMessage({
        type: "info",
        message: "Deleting campaign...",
      });

      deleteMutation.mutate(campaign.id, {
        onSuccess: () => {
          setMessage({
            type: "success",
            message: "Campaign deleted successfully",
          });

          setTimeout(() => {
            void router.push("/dashboard/campaigns");
          }, 1500);
        },
        onError: (error) => {
          setMessage({
            type: "error",
            message: error.message,
          });
        },
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="mt-4 flex flex-col space-y-4 rounded-lg bg-white p-4 text-gray-600">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xl font-bold ">
            {campaign ? "Edit" : "Create"} Campaign
          </p>
          {campaign && (
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

          <div className="flex w-full flex-col items-center gap-4 sm:flex-row">
            <div className="flex w-full grow flex-col gap-2">
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                fullWidth
                size="small"
                onChange={(e) => {
                  formik.handleChange(e);
                  void formik.setFieldValue(
                    "url",
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-zA-Z0-9\s]+/g, "")
                      .replace(/\s+/g, "-"),
                  );
                }}
                value={formik.values.title}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                id="url"
                label="URL"
                variant="outlined"
                fullWidth
                size="small"
                onChange={formik.handleChange}
                value={formik.values.url}
                error={formik.touched.url && Boolean(formik.errors.url)}
                helperText={formik.touched.url && formik.errors.url}
              />
              <TextField
                id="thumbnail"
                label="Thumbnail URL"
                variant="outlined"
                fullWidth
                size="small"
                onChange={formik.handleChange}
                value={formik.values.thumbnail}
                error={
                  formik.touched.thumbnail && Boolean(formik.errors.thumbnail)
                }
              />
              <TextField
                id="target"
                label="Target"
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.target}
                InputProps={{
                  startAdornment: <p>Rp</p>,
                }}
                error={formik.touched.target && Boolean(formik.errors.target)}
              />
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Select
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  label="Status"
                  size="small"
                  id="status"
                  name="status"
                >
                  <MenuItem value="ACTIVE">Active</MenuItem>
                  <MenuItem value="INACTIVE">Inactive</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                </Select>
              </FormControl>
              <DatePicker
                value={formik.values.startDate}
                onChange={(date) => formik.setFieldValue("startDate", date)}
                label="Start Date"
              />
              <DatePicker
                value={formik.values.endDate}
                onChange={(date) => formik.setFieldValue("endDate", date)}
                label="End Date"
              />
            </div>
            <img
              src={formik.values.thumbnail || "/logo.png"}
              alt="thumbnail"
              className="w-92 h-72 rounded-lg object-cover"
            />
          </div>
          <ContentEditor value={content} onChange={setContent} />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="rounded-lg"
          >
            {campaign ? "Update" : "Create"} Campaign
          </Button>
        </form>
      </div>
      {campaign && campaign.donations.length > 0 && (
        <div className="mt-4 flex flex-col space-y-4 rounded-lg bg-white p-4 text-gray-600">
          <p className="text-xl font-bold">Donations</p>
          <DonationList donations={campaign.donations} />
        </div>
      )}
    </LocalizationProvider>
  );
};

export default CampaignForm;
