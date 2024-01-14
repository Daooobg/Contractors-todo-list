import { Button, Card, Center, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const LoginPage = () => {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) =>
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                    ? null
                    : 'Invalid email',
            password: (value) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value)
                    ? null
                    : 'The password must be at least six characters and contain at least one number, uppercase, and lowercase letter.',
        },
    });

    const submitHandler = (data) => {
        console.log(data);
    };

    return (
        <Center h='100vh'>
            <Card w='300px' shadow='sm' padding='lg' radius='md' withBorder>
                <Text my='xl' mx='auto' fz='xl' fw='900' fs='italic'>
                    Login form
                </Text>
                <form onSubmit={form.onSubmit(submitHandler)}>
                    <TextInput
                        required
                        withAsterisk
                        label='Email'
                        placeholder='your@email.com'
                        mb='lg'
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        required
                        withAsterisk
                        label='Password'
                        placeholder='password'
                        mb='lg'
                        {...form.getInputProps('password')}
                    />
                    <Button type='Submit' fullWidth mt='md' radius='lg'>
                        Login
                    </Button>
                </form>
            </Card>
        </Center>
    );
};
export default LoginPage;
