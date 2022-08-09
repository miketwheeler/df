import React from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { Field, Form, Formik } from 'formik'
import { login, logout } from './store/slices/userSlice'



function UserLogin() {
    
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)

    if(user) {
        return (
            <div>
                Hello, { user.username }!
                <button onClick={() => dispatch(logout())}>Logout</button>
            </div>
        )
    }
    return (
        <div>
            <Formik
                initialValues={{ username: '', password: ''}}
                onSubmit={(values) => { dispatch(login(values)) }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="type" name="username" />
                            <Field type="password" name="password" />
                            <button type="submit" disabled={isSubmitting}>
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
        </div>
    )
}

export default UserLogin