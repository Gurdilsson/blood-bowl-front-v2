import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router';
import { style } from "../Common/Style";
import { isUserLogged } from "./AuthentificationUtils";
import { USER_ID, USER_NAME, USER_PASSWORD, USER_PSEUDO, USER_ROLE } from "./UserInterface";

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
        backgroundColor: style.bloodBowlWhite,
        maxWidth: 300,
        alignSelf: 'center',
        width: '100%',
        boxShadow: `5px 2px 2px ${style.bloodBowlDarkBlue}`,
        textAlign: 'center',
        fontFamily: 'Gutcruncher',
    },
    globalContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    text: {
        color: style.bloodBowlWhite,
        fontSize: 40,
        maxWidth: 550,
        fontWeight: 700,
        margin: 30,
        marginTop: '5vh',
        alignSelf: 'center',
        fontFamily: 'Gutcruncher',
        textShadow: `1px 1px 1px black`,
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
        backgroundColor: style.bloodBowlWhite,
        maxWidth: 520,
        alignSelf: 'center',
        width: '25%',
        boxShadow: `5px 2px 2px ${style.bloodBowlDarkBlue}`,
        display: 'flex'
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10
    }
});

export interface useFormProps {
    name: string
    password: string
}

function LoginComponent() {
    const navigate = useNavigate()
    const classes = useStyles()
    const [error, setError] = useState(false)
    const { register, resetField, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            password: ""
        }
    })

    async function onSubmit(data: useFormProps) {
        await fetch(`http://localhost:8080/user/auth/${data.name}/${data.password}`)
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

        resetField('name')
        resetField('password')
        navigate('/loading')
    }

    const onError = (errors: any) => {
        console.log('error', errors)
    }

    if (isUserLogged()) {
        return (<Navigate to="/home" />)
    }
    else {
        return (
            <div className={classes.globalContainer}>
                <form onSubmit={handleSubmit(onSubmit, onError)} className={classes.formContainer}>
                    <label className={classes.label}>
                        <div className={classes.text}>Déjà inscrit ? Connectez-vous !</div>
                        <input
                            className={classes.input}
                            type="text"
                            {...register("name", { required: 'Ce champ est obligatoire' })}
                            autoComplete="off" 
                            placeholder={'Identifiant'}
                        />
                        <input
                            className={classes.input}
                            type="password"
                            {...register("password", { required: 'Ce champ est obligatoire' })}
                            autoComplete="off"
                            placeholder={'Mot de passe'}
                        />
                        {error && <div className={classes.error}>L'utilisateur ou le mot de passe est incorect ! </div>}
                        <input className={classes.button} type="submit" value="Go !" />
                    </label>
                </form>
            </div>
        )
    }

}

export default LoginComponent