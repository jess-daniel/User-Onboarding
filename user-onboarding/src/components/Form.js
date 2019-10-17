import React from "react";
import {withFormik, Form, Field, yupToFormErrors} from "formik";
import * as Yup from "yup";

const UserForm = ({errors, touched}) => {

    return (
        <Form className="user-form">
            <label> Name:
            <Field 
                type="text" 
                name="name" 
                placeholder="name"/>
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
            </label>
            <label> Email:
            <Field 
                type="email" 
                name="email" 
                placeholder="email"/>
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}
            </label>
            <label> Password:
            <Field 
                type="password" 
                name="password" 
                placeholder="password"/>
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}
            </label>
            <label> Terms of Service:
            <Field 
                type="checkbox" 
                name="tos" 
                />
            </label>
            <button type="submit">Submit</button>
        </Form>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, tos}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email().required("email is required"),
        password: Yup.string().required("Password is required")
    }) 
})(UserForm)

export default FormikUserForm;