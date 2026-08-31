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

import { contactFormSchema, type ContactFormValues } from '@/lib/validation/contact.schema';

const categories = [
  {
    label: 'Select an option',
    value: '',
  },
  {
    label: 'Community / Campus Event',
    value: 'Community / Campus Event',
  },
  {
    label: 'Partnership Inquiry',
    value: 'Partnership',
  },
  {
    label: 'Sponsorship Opportunity',
    value: 'Sponsorship',
  },
  {
    label: 'Enterprise / Custom Program',
    value: 'Enterprise / Custom Program',
  },
  {
    label: 'General Inquiry',
    value: 'General Inquiry',
  },
  {
    label: 'Press / Media Inquiry',
    value: 'Press / Media',
  },
] as const;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      contact_number: '',
      organization: '',
      category: undefined,
      subject: '',
      message: '',
      consentGiven: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Contact form submission failed:', error);
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
              Inquiry Submitted Successfully
            </h4>
            <p className="text-body-sm opacity-90">
              Thank you for reaching out. Someone from the OrigoHOST team will
              review and follow up shortly.
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
              There was an issue processing your request. Please check your
              connection and try again.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="grid grid-cols-1">
          <FormField
            label="Full Name"
            error={errors.name?.message}
            required
            id="contact-name"
          >
            <Input
              id="contact-name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              {...register('name')}
              error={Boolean(errors.name)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Email Address"
            error={errors.email?.message}
            required
            id="contact-email"
          >
            <Input
              id="contact-email"
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              {...register('email')}
              error={Boolean(errors.email)}
            />
          </FormField>

          <FormField
            label="Contact Number"
            error={errors.contact_number?.message}
            id="contact-number"
          >
            <Input
              id="contact-number"
              type="text"
              placeholder="+919876543210"
              autoComplete="tel"
              {...register('contact_number')}
              error={Boolean(errors.contact_number)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Organization / Institution"
            error={errors.organization?.message}
            id="contact-org"
          >
            <Input
              id="contact-org"
              type="text"
              placeholder="OrigoHOST Community"
              autoComplete="organization"
              {...register('organization')}
              error={Boolean(errors.organization)}
            />
          </FormField>

          <FormField
            label="Inquiry Category"
            error={errors.category?.message}
            required
            id="contact-category"
          >
            <Select
              id="contact-category"
              options={categories}
              {...register('category')}
              error={Boolean(errors.category)}
            />
          </FormField>
        </div>

        <FormField
          label="Subject"
          error={errors.subject?.message}
          required
          id="contact-subject"
        >
          <Input
            id="contact-subject"
            type="text"
            placeholder="Collaboration / Hackathon Hosting Request"
            {...register('subject')}
            error={Boolean(errors.subject)}
          />
        </FormField>

        <FormField
          label="Message"
          error={errors.message?.message}
          required
          id="contact-message"
        >
          <Textarea
            id="contact-message"
            placeholder="Please provide details about your inquiry..."
            {...register('message')}
            error={Boolean(errors.message)}
          />
        </FormField>

        <FormField
          label=""
          error={errors.consentGiven?.message}
          id="contact-consent"
        >
          <Checkbox
            id="contact-consent"
            label="I consent to OrigoHOST processing this information in accordance with their privacy policy."
            {...register('consentGiven')}
            error={Boolean(errors.consentGiven)}
          />
        </FormField>

        <Button
          type="submit"
          loading={isSubmitting}
          className="mt-4 w-full justify-center"
          magnetic
          disabled={isSubmitting}
        >
          Submit Inquiry
        </Button>
      </form>
    </div>
  );
}