import React, { useEffect, useState } from "react";
import { Form, Formik, Field } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { cls } from "../../../../helpers/cls";
import { object, number, string, boolean } from "yup";
import { makeStyles } from "@material-ui/core";
import { useTypeDispatch } from "../../../../store/hooks/useDispatch";
import { useTypeSelector } from "../../../../store/hooks/useSelector";
import { notifySuccess } from "../../../../helpers/NotifyBtn";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  errorColor: {
    color: theme.palette.error.main,
  },
  terms: {
    color: "#000",
  },
}));

const RegForm = () => {
  const classes = useStyles();
  const { push } = useRouter();

  const [formFailed, setFormFailed] = useState(false);
  const { authRegister } = useTypeDispatch();
  const { userRegister, phoneVerified } = useTypeSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (userRegister?.access_token) {
      notifySuccess("Регистрация прошла успешно!");
      push("/profile");
    }
  }, [userRegister]);

  const yupStringValidation = (field) => {
    return string().required(` ${field} `).min(1).max(100);
  };

  return (
    <div className="registration-form">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirmation: "",
          termsAndConditions: false,
        }}
        validationSchema={object({
          first_name: yupStringValidation("Имя"),
          last_name: yupStringValidation("Фамилия"),
          // email: yupStringValidation("Email"),
          password: yupStringValidation("Пароль"),
          password_confirmation: yupStringValidation("Пароль"),
          termsAndConditions: boolean().isTrue("Необходимо принять условия"),
        })}
        onSubmit={async (values) => {
          cls.log("Here", values);
          await authRegister({
            ...values,
            id: phoneVerified?.id,
            key: phoneVerified?.key,
          });
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form autoComplete={"off"}>
            <div className="regoForm">
              <div className="">
                <p className="">
                  {errors.first_name && formFailed ? (
                    <span className={"alert-danger px-2 py-1 br-6"}>
                      {errors.first_name}
                    </span>
                  ) : (
                    "Имя"
                  )}
                </p>
                <Field
                  name={"first_name"}
                  className={"verify-element"}
                  placeholder={"Введите ваше имя"}
                  // component={TextField}
                  // variant={"outlined"}
                />
              </div>
              <div className="">
                <p className="">
                  {errors.last_name && formFailed ? (
                    <span className={"alert-danger px-2 py-1 br-6"}>
                      {errors.last_name}
                    </span>
                  ) : (
                    "Фамилия"
                  )}
                </p>
                <Field
                  name={"last_name"}
                  className={"verify-element"}
                  placeholder={"Введите вашу фамилию"}
                />
              </div>
            </div>
            <div className="">
              <p className="">
                {errors.email && formFailed ? (
                  <span className={"alert-danger px-2 py-1 br-6"}>
                    {errors.email}
                  </span>
                ) : (
                  "E-mail"
                )}
              </p>
              <Field
                // style={{ width: "740px" }}
                name={"email"}
                type={"email"}
                className={"verify-element"}
                placeholder={"Введите ваш e-mail"}
              />
            </div>
            <div className="regoForm">
              <div className="">
                <p className="">
                  {errors.password && formFailed ? (
                    <span className={"alert-danger px-2 py-1 br-6"}>
                      {errors.password}
                    </span>
                  ) : (
                    "Пароль"
                  )}
                </p>
                <Field
                  name={"password"}
                  type={"password"}
                  className={"verify-element"}
                  placeholder={"Введите пароль"}
                />
              </div>

              <div className="">
                <p className="">
                  {errors.password_confirmation && formFailed ? (
                    <span className={"alert-danger px-2 py-1 br-6"}>
                      {errors.password_confirmation}
                    </span>
                  ) : (
                    "Подтверждение Пароля"
                  )}
                </p>
                <Field
                  name={"password_confirmation"}
                  type={"password"}
                  className={"verify-element"}
                  placeholder={"Подтвердите пароль"}
                />
              </div>
            </div>

            <div className="checkboxContainer">
              <Field
                style={{ maxWidth: "unset" }}
                name={"termsAndConditions"}
                className={"verify-element1"}
                type={"checkbox"}
                component={CheckboxWithLabel}
                Label={{
                  label:
                    "Я согласен с политикой конфиденциальности, \n" +
                    "правилами пользования сайтом и правилами \n" +
                    "возврата и обмена.",
                  className:
                    errors.termsAndConditions && formFailed
                      ? classes.errorColor
                      : undefined,
                }}
              />
            </div>

            <div className={"text-right"}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn main btn-brandstore"
                onClick={() => setFormFailed(true)}
              >
                {isSubmitting ? "Подтверждается" : "Подтвердить"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegForm;
