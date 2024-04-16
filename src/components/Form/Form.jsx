import { useState } from 'react';

const emailExample = 'example@example.com';

const Form = () => {
    const [formValues, setFormValue] = useState({
        name: '',
        password: '',
        confirmPassword: '',
    });

    const [validationMessages, setValidationMessages] = useState({
        passwordLength: '',
        passwordLowercaseLetter: '',
        passwordUppercaseLetter: '',
        passwordNumberCharacter: '',
        passwordSpecialCharacter: '',
        passwordConfirmation: '',
        emailConfirmation: '',
    });

    const [isDisabled, setIsDisabled] = useState(false);

    const validatePassword = value => {
        const messages = {
            passwordLength:
                value.length >= 8
                    ? `v hasło zawiera zawiera ${value.length} znaków`
                    : 'x hasło powinno składać się z co najmniej 8 znaków',
            passwordLowercaseLetter: /[a-z]/.test(value)
                ? 'v hasło zawiera co najmniej jedną małą literę'
                : 'x hasło powinno zawierać co najmniej jedną małą literę',
            passwordUppercaseLetter: /[A-Z]/.test(value)
                ? 'v hasło zawiera co najmniej jedną wielką literę'
                : 'x hasło powinno zawierać co najmniej jedną wielką literę',
            passwordNumberCharacter: /[0-9]/.test(value)
                ? 'v hasło zawiera co najmniej jedną liczbę'
                : 'x hasło powinno zawierać co najmniej jedną liczbę',
            passwordSpecialCharacter:
                // eslint-disable-next-line no-useless-escape
                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)
                    ? 'v hasło zawiera znak specjalny'
                    : 'x hasło nie zawiera znaków specjalnych',
            passwordConfirmation:
                confirmPassword.length > 0 && password === confirmPassword
                    ? 'v hasła są takie same'
                    : 'x hasła są różne',
        };
        setValidationMessages(messages);
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setFormValue(prevValues => ({ ...prevValues, [name]: value }));

        if (name === 'password' || name === 'confirmPassword') {
            validatePassword(value);
        }
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (!!email && email === emailExample) {
            setValidationMessages(prevMessage => ({
                ...prevMessage,
                emailConfirmation:
                    'użytkownik z takim adresem email istnieje już w bazie',
            }));
        }
    };

    const handleBlur = () => {
        if (!!email && email === emailExample) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    };

    const { email, password, confirmPassword } = formValues;

    const {
        passwordLength,
        passwordLowercaseLetter,
        passwordUppercaseLetter,
        passwordNumberCharacter,
        passwordSpecialCharacter,
        passwordConfirmation,
        emailConfirmation,
    } = validationMessages;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email'>E-mail:</label>
                <input
                    id='email'
                    name='email'
                    type='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <p>{emailConfirmation}</p>
            </div>

            <div>
                <label htmlFor='password'>Hasło:</label>
                <input
                    id='password'
                    name='password'
                    type='password'
                    onChange={handleChange}
                    disabled={isDisabled}
                />

                <p>{passwordLength}</p>
                <p>{passwordLowercaseLetter}</p>
                <p>{passwordUppercaseLetter}</p>
                <p>{passwordNumberCharacter}</p>
                <p>{passwordSpecialCharacter}</p>
            </div>

            <div>
                <label htmlFor='confirmPassword'>Potwierdź hasło:</label>
                <input
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    onChange={handleChange}
                    disabled={isDisabled}
                />
                <p>{passwordConfirmation}</p>
            </div>

            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    );
};

export default Form;
