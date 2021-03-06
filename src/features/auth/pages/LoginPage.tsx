import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";

import { schemaLogin } from "../validate";
import { userState } from "app/atoms";
import { LoginType } from "models";
import { auth } from "firebase/config";
import { InputField } from "components/FormFields";

const defaultValues: LoginType = {
    username: "",
    password: "",
};

export const LoginPage = () => {
    const [user, setUser] = useRecoilState(userState);
    const [showErr, setShowErr] = useState(false);

    const { control, handleSubmit } = useForm<LoginType>({
        defaultValues,
        resolver: yupResolver(schemaLogin),
    });

    const onSubmit = ({ username, password }: LoginType) => {
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                // Signed in
                const { email, uid } = userCredential.user;
                setUser({ currentUser: { email: email || "", id: uid } });
                setShowErr(false);
            })
            .catch((error) => {
                setShowErr(true);
            });
    };

    if (user.currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div className="flex items-center justify-center">
            <div className="flex-col justify-center hidden ml-4 border-t-0 border border-gray-200 lg:flex h-[96vh] shadow-xl rounded-xl">
                <h3 className="px-10 pb-10 text-3xl font-bold font-sans">WelCome Back</h3>
                <img
                    alt="login-img"
                    src="https://minimal-kit-react.vercel.app/static/illustrations/illustration_login.png"
                />
            </div>
            <div className="w-full sm:flex-1 flex flex-col items-center justify-center text-center px-7 h-screen pb-10">
                <img
                    className="object-contain h-52"
                    src="https://image.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg"
                    alt=""
                />

                <h3 className="text-2xl font-bold font-sans">????ng nh???p</h3>

                <div className="w-full sm:w-[32rem] ">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputField label="T??i Kho???n" name="username" control={control} colorBorder="success" />
                        <InputField
                            label="M???t Kh???u"
                            name="password"
                            control={control}
                            colorBorder="success"
                            type="password"
                        />

                        {showErr && (
                            <div
                                className="bg-red-100 border mt-3 border-red-400 text-red-700 px-4 py-3 rounded relative"
                                role="alert"
                            >
                                <strong className="font-bold">???i d???i ??i!</strong>{" "}
                                <span className="block sm:inline">T??i kho???n ho???c m???t kh???u kh??ng ch??nh x??c.</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className=" mt-4 hover:bg-green-700 transition-all duration-200 shadow-md font-medium bg-green-500 w-full py-3 rounded-md text-white"
                        >
                            ????ng nh???p
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
