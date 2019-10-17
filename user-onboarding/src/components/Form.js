import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({errors, touched, values, status}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status])
    }, [status])

    return (
        <div>
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
                checked={values.tos}
                />
            </label>
            <button type="submit">Submit</button>
        </Form>
            {users.map(user => (
            <ul key={user.id}> 
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                <li>Checked: {user.tos}</li>
            </ul>
        ))}
        </div>
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
    }),
    handleSubmit(values, {setStatus}) {
        axios.post("https://reqres.in/api/users_", values)
            .then(response => {
                console.log(response);
                setStatus(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    } 
})(UserForm)

export default FormikUserForm;