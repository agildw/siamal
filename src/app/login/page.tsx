/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from "next/image";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useState} from "react";
import {api} from "~/trpc/react";
import type {AlertMessage} from "../../../types/utils";
import {Alert, TextField} from "@mui/material";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";


const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
});

const registerSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
});

const Login = () => {
    const router = useRouter();
    const createMutation = api.user.createUser.useMutation();
    const [message, setMessage] = useState<AlertMessage | null>(null);
    const [isLogin, setIsLogin] = useState(true);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        },
        validationSchema: isLogin ? loginSchema : registerSchema,
        onSubmit: async (values) => {
            setMessage(null);

            if (isLogin) {
                setMessage({
                    type: "info",
                    message: "Signing in...",
                });
                try {
                    const res = await signIn("credentials", {
                        email: values.email,
                        password: values.password,
                        redirect: false,
                    })
                    if (res?.error) {
                        const errMsg = res.status === 401 ? "Invalid email or password" : res.error;
                        setMessage({type: "error", message:errMsg});
                        return;
                    }
                    router.push("/");
                } catch (error: any) {
                    console.error(error);
                    setMessage({type: "error", message: error.message});
                }
            } else {
                setMessage({
                    type: "info",
                    message: "Creating account...",
                });

                try {
                    await createMutation.mutateAsync({
                        email: values.email,
                        password: values.password,
                        name: values.name,
                    })

                    setMessage({type: "success", message: "Account created successfully. Please login."});
                    setIsLogin(true);

                } catch (error: any) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    const errMsg = error?.message?.includes("email") ? "Email already exists" : error.message;
                    setMessage({type: "error", message: errMsg});
                }
            }

        }
    });

    return (

        <div className="bg-white">
            <div className="flex h-screen justify-center">
                <div
                    className="hidden bg-blue-400 bg-cover lg:block lg:w-2/3"
                    style={{
                        backgroundImage: "url('/hero-bg-3.jpg')",
                    }}
                >
                    {/* <div className="flex h-full items-center bg-gray-900 bg-opacity-40 px-20"> */}
                    <div className="flex h-full items-center bg-gray-900 bg-opacity-40 px-20">
                        <div>
                            <h2 className="text-4xl font-bold text-white">Siamal</h2>
                            <p className="mt-3 max-w-xl text-xl text-gray-100">
                                Mari lanjutkan perjuangan kita. Bersama Siamal, setiap langkah
                                kecil Anda menciptakan perubahan besar bagi mereka yang
                                membutuhkan.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex w-full max-w-md items-center px-6 lg:w-2/6">
                    <div className="flex-1">
                        <div className="flex flex-col items-center">
                            <Image
                                src="/logo.png"
                                width={100}
                                height={100}
                                alt="Logo"
                                className="rounded-lg"
                            />
                            <h2 className="text-center text-2xl font-bold text-gray-700 mt-3">
                                Siamal
                            </h2>
                            <p className="text-gray-500">
                                {isLogin ? "Sign in to your account" : "Create an account"}
                            </p>
                        </div>
                        <div className="mt-8">
                            {message && (
                                <Alert severity={message.type} onClose={() => setMessage(null)} className="mb-4">
                                    {message.message}
                                </Alert>
                            )}
                            <form className={"space-y-4"} onSubmit={formik.handleSubmit}>
                                {!isLogin && (
                                    <TextField
                                        label="Name"
                                        id="name"
                                        name="name"
                                        placeholder={"Your Name"}
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                )}

                                <TextField
                                    label="Email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={"Your Email"}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField
                                    label="Password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder={"Your Password"}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                {!isLogin && (
                                    <TextField
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    />
                                )}
                                <button
                                    className="w-full transform rounded-md bg-blue-600 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-blue-500 focus:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                    type="submit">
                                    Sign in
                                </button>
                            </form>
                            <p className="mt-6 text-center text-sm text-gray-400">
                                {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
                                <span
                                    className="text-blue-500 hover:underline focus:underline focus:outline-none cursor-pointer"
                                    onClick={() => setIsLogin(!isLogin)}
                                >
                                    {isLogin ? "Sign up" : "Sign in"}
                                </span>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
