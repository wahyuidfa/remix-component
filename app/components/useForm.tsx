import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { InputDefault } from './inputWithIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';


const userSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    country: yup.string().required('Country is required'),
    city: yup.string().required('City is required'),
    street: yup.string().required('Street is required'),
    streetNumber: yup
        .number()
        .typeError('Street Number must be a number')
        .positive('Street Number must be positive')
        .integer('Street Number must be an integer')
        .required('Street Number is required'),
    Floor: yup
        .number()
        .typeError('Floor must be a number')
        .positive('Floor must be positive')
        .integer('Floor must be an integer')
        .required('Floor is required'),
});

const UserForm = ({ onSubmit, initialData }: any) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            name: '',
            email: '',
            country: '',
            city: '',
            street: '',
            streetNumber: 0,
            Floor: 0,
        },
    });

    // Reset form dengan data awal jika ada
    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputDefault label='Name' {...register('name')} message={errors?.name?.message} variant={errors.name?.message ? 'error' : 'default'} placeholder="Name" />
            <InputDefault label='Email'  {...register('email')} message={errors?.email?.message} variant={errors.email?.message ? 'error' : 'default'} placeholder="Email" />
            <InputDefault label='Country'  {...register('country')} message={errors?.country?.message} variant={errors.country?.message ? 'error' : 'default'} placeholder="Country" />
            <InputDefault label='City'  {...register('city')} message={errors?.city?.message} variant={errors.city?.message ? 'error' : 'default'} placeholder="City" />
            <InputDefault label='Street'  {...register('street')} message={errors?.street?.message} variant={errors.street?.message ? 'error' : 'default'} placeholder="Street" />
            <InputDefault label='Street Number'  {...register('streetNumber')} message={errors?.streetNumber?.message} variant={errors.streetNumber?.message ? 'error' : 'default'} placeholder="Street Number" />
            <InputDefault label='Floor' {...register('Floor')} message={errors?.Floor?.message} variant={errors.Floor?.message ? 'error' : 'default'} placeholder="Floor" />
            <Button type="submit">Submit</Button>
        </form>
    );
};

export default UserForm;
