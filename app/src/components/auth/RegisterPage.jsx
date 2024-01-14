import { Button, Card, Center, PasswordInput, Select, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRegisterUserMutation } from '../../store/features/api/authApi';

const RegisterPage = () => {
    const [registerUser] = useRegisterUserMutation();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            fullName: '',
            rePassword: '',
            role: '',
        },
        validate: {
            fullName: (value) => (value.trim().length > 4 ? null : 'Please write your full name'),
            email: (value) =>
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                    ? null
                    : 'Invalid email',
            password: (value) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value)
                    ? null
                    : 'The password must be at least six characters and contain at least one number, uppercase, and lowercase letter.',
            rePassword: (value, values) =>
                value === values.password ? null : 'Passwords did not match',
            role: (value) =>
                ['Contractor', 'Agent'].includes(value) ? null : 'Please select role',
        },
    });

    const submitHandler = async (data) => {
        await registerUser({
            fullName: data.fullName,
            password: data.password,
            role: data.role,
            email: data.email,
        });
    };

    return (
        <Center h='100vh'>
            <Card w='300px' shadow='sm' padding='lg' radius='md' withBorder>
                <Text my='xl' mx='auto' fz='xl' fw='900' fs='italic'>
                    Register form
                </Text>
                <form onSubmit={form.onSubmit(submitHandler)}>
                    <TextInput
                        required
                        withAsterisk
                        label='Full Name'
                        placeholder='your full name'
                        mb='lg'
                        {...form.getInputProps('fullName')}
                    />
                    <TextInput
                        required
                        withAsterisk
                        label='Email'
                        name='email'
                        placeholder='your@email.com'
                        mb='lg'
                        {...form.getInputProps('email')}
                    />
                    <Select
                        label='Role'
                        withAsterisk
                        placeholder='select role'
                        data={['Agent', 'Contractor']}
                        mb='lg'
                        {...form.getInputProps('role')}
                    />
                    <PasswordInput
                        required
                        withAsterisk
                        label='Password'
                        placeholder='password'
                        mb='lg'
                        {...form.getInputProps('password')}
                    />
                    <PasswordInput
                        required
                        withAsterisk
                        label='Repeat Password'
                        placeholder='repeat password'
                        mb='lg'
                        {...form.getInputProps('rePassword')}
                    />
                    <Button type='Submit' fullWidth mt='md' radius='lg'>
                        Register
                    </Button>
                </form>
            </Card>
        </Center>
    );
};
export default RegisterPage;
