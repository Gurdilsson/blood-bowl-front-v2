import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { style } from "../Common/Style";
import { Role, USER_ID, USER_NAME, USER_PASSWORD, USER_PSEUDO, USER_ROLE } from "./UserInterface";
import { useNavigate } from "react-router-dom";

export const useStyles = makeStyles({
    formContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: '10vh'
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    input: {
        flex: 1,
        marginBottom: 10,
        borderRadius: 10,
        maxHeight: 80,
        fontSize: 24,
        padding: 10,
        border: 'none',
        backgroundColor: style.bloodBowlBlue,
        maxWidth: 300,
        alignSelf: 'center',
        width: '100%',
        boxShadow: `5px 2px 2px grey`,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Gutcruncher',
    },
    globalContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    text: {
        color: style.bloodBowlBlue,
        fontSize: 40,
        maxWidth: 550,
        fontWeight: 700,
        margin: 30,
        marginTop: '5vh',
        alignSelf: 'center',
        fontFamily: 'Gutcruncher',
        textShadow: `1px 1px 1px ${style.bloodBowlDarkBlue}`,
        textAlign: 'center'
    },
    button: {
        fontFamily: 'Gutcruncher',
        flex: 1,
        borderRadius: 10,
        padding: 10,
        maxHeight: 70,
        fontSize: 20,
        border: 'none',
        backgroundColor: style.bloodBowlBlue,
        maxWidth: 520,
        alignSelf: 'center',
        width: '25%',
        boxShadow: `5px 2px 2px grey`,
        display: 'flex'
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10
    }
});

export interface creationFormProps {
    userName: string
    userPseudo: string
    userPassword: string
}

export interface newUser {
    userName: string
    userPseudo: string
    userPassword: string
    userRole: Role
}

function AccountCreationComponent() {
    const classes = useStyles()
    const navigate = useNavigate()
    const { register, handleSubmit, resetField, formState: { errors } } = useForm({
        defaultValues: {
            userName: "",
            userPseudo: "",
            userPassword: ""
        }
    });
    const [error, setError] = useState(false)
    console.log(errors);

    async function onSubmit(data: creationFormProps) {
        console.log(data)
        const newUser: newUser = { ...data, userRole: Role.USER }
        console.log('new user', newUser)

        await fetch(`http://localhost:8080/user/create`, { method: 'POST', body: JSON.stringify(newUser), headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    setError(true)
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                window.localStorage.setItem(USER_ID, data.userId.toString())
                window.localStorage.setItem(USER_NAME, data.userName.toString())
                window.localStorage.setItem(USER_PSEUDO, data.userPseudo.toString())
                window.localStorage.setItem(USER_PASSWORD, data.userPassword.toString())
                window.localStorage.setItem(USER_ROLE, data.userRole.toString())
            })

        resetField('userName')
        resetField('userPseudo')
        resetField('userPassword')
        navigate('/loading')

    }

    return (
        <form className={classes.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <label className={classes.label}>
                <div className={classes.text}>Pas encore de compte ? C'est par ici !</div>
                <input
                    className={classes.input}
                    type="text"
                    placeholder="Identifiant"
                    {...register("userName", { required: true })}
                    autoComplete="off" />
                <input className={classes.input}
                    type="text"
                    placeholder="Pseudonyme"
                    {...register("userPseudo", { required: true })}
                    autoComplete="off" />
                <input className={classes.input}
                    type="password" placeholder="Passeword"
                    {...register("userPassword", { required: true })}
                    autoComplete="off" />

                <input className={classes.button} type="submit" value="Go !" />
            </label>
        </form>

    )
}

export default AccountCreationComponent