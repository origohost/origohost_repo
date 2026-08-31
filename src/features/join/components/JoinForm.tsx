'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/forms/Input';
import { Textarea } from '@/components/forms/Textarea';
import { Select } from '@/components/forms/Select';
import { Checkbox } from '@/components/forms/Checkbox';
import { FormField } from '@/components/forms/FormField';

import { joinFormSchema, type JoinFormValues } from '@/lib/validation/join.schema';

const pathways = [
  {
    label: 'Select an option',
    value: '',
  },
  {
    label: 'Ecosystem Participant',
    value: 'Participant',
  },
  {
    label: 'Community Volunteer',
    value: 'Volunteer',
  },
  {
    label: 'Technical Speaker / Presenter',
    value: 'Speaker',
  },
  {
    label: 'Expert Mentor / Trainer',
    value: 'Mentor',
  },
  {
    label: 'Campus Chapter Organizer',
    value: 'Organizer',
  },
  {
    label: 'Campus Representative',
    value: 'Campus Representative',
  },
] as const;

export function JoinForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JoinFormValues>({
    resolver: zodResolver(joinFormSchema),

    defaultValues: {
      name: '',
      email: '',
      organization: '',
      pathway: undefined,
      motivation: '',
      consentGiven: false,
    },
  });

  const onSubmit = async (data: JoinFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Join request failed with status ${response.status}`);
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Join form submission failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border border-brand-deep/[0.06] bg-surface p-6 shadow-card md:p-8">
      {submitStatus === 'success' && (
        <div
          className="mb-6 flex items-start gap-3 rounded-xl border border-success/15 bg-success-light p-4 text-success"
          role="status"
          aria-live="polite"
        >
          <svg
            className="mt-0.5 h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div>
            <h4 className="mb-1 text-body-md font-semibold">
              Application Submitted Successfully
            </h4>

            <p className="text-body-sm opacity-90">
              Thank you for applying. We are thrilled to welcome new builders
              to our ecosystem. We will review and reach out soon.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          className="mb-6 flex items-start gap-3 rounded-xl border border-error/15 bg-error-light p-4 text-error"
          role="alert"
          aria-live="assertive"
        >
          <svg
            className="mt-0.5 h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>

          <div>
            <h4 className="mb-1 text-body-md font-semibold">
              Submission Failed
            </h4>

            <p className="text-body-sm opacity-90">
              There was an issue processing your application. Please check
              your input and connection and try again.
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Full Name"
            error={errors.name?.message}
            required
            id="join-name"
          >
            <Input
              id="join-name"
              type="text"
              placeholder="Tarun Kumar"
              autoComplete="name"
              {...register('name')}
              error={Boolean(errors.name)}
            />
          </FormField>

          <FormField
            label="Email Address"
            error={errors.email?.message}
            required
            id="join-email"
          >
            <Input
              id="join-email"
              type="email"
              placeholder="tarun@example.com"
              autoComplete="email"
              {...register('email')}
              error={Boolean(errors.email)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Organization / Institution"
            error={errors.organization?.message}
            id="join-org"
          >
            <Input
              id="join-org"
              type="text"
              placeholder="GL Bajaj"
              autoComplete="organization"
              {...register('organization')}
              error={Boolean(errors.organization)}
            />
          </FormField>

          <FormField
            label="Pathway of Interest"
            error={errors.pathway?.message}
            required
            id="join-pathway"
          >
            <Select
              id="join-pathway"
              options={pathways}
              {...register('pathway')}
              error={Boolean(errors.pathway)}
            />
          </FormField>
        </div>

        <FormField
          label="Why do you want to join and what do you build?"
          error={errors.motivation?.message}
          required
          id="join-motivation"
        >
          <Textarea
            id="join-motivation"
            placeholder="Share details about your experience, interests, projects you've built, or how you want to contribute to the ecosystem..."
            {...register('motivation')}
            error={Boolean(errors.motivation)}
          />
        </FormField>

        <FormField
          label=""
          error={errors.consentGiven?.message}
          id="join-consent"
        >
          <Checkbox
            id="join-consent"
            label="I consent to OrigoHOST processing this information in accordance with their privacy policy."
            {...register('consentGiven')}
            error={Boolean(errors.consentGiven)}
          />
        </FormField>

        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="mt-4 w-full justify-center"
          magnetic
        >
          Submit Pathway Application
        </Button>
      </form>
    </div>
  );
}