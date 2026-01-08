// src/ai/flows/personalized-tutoring.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized tutoring in STEM subjects.
 *
 * The flow takes a student's learning style, knowledge gaps, and the STEM concept they're struggling with as input.
 * It then uses an AI model to generate personalized guidance tailored to the student's needs.
 *
 * @interface PersonalizedTutoringInput - The input schema for the personalized tutoring flow.
 * @interface PersonalizedTutoringOutput - The output schema for the personalized tutoring flow.
 * @function personalizedTutoring - The main function to trigger the personalized tutoring flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTutoringInputSchema = z.object({
  learningStyle: z
    .string()
    .describe(
      'The preferred learning style of the student (e.g., visual, auditory, kinesthetic).'
    ),
  knowledgeGaps: z
    .string()
    .describe('Description of the student knowledge gaps.'),
  studentQuestion: z
    .string()
    .describe('The specific question the student has'),
});

export type PersonalizedTutoringInput = z.infer<
  typeof PersonalizedTutoringInputSchema
>;

const PersonalizedTutoringOutputSchema = z.object({
  guidance: z
    .string()
    .describe(
      'Personalized guidance and explanations in Markdown format, tailored to the student learning style and knowledge gaps to improve understanding of the STEM concept.'
    ),
});

export type PersonalizedTutoringOutput = z.infer<
  typeof PersonalizedTutoringOutputSchema
>;

export async function personalizedTutoring(
  input: PersonalizedTutoringInput
): Promise<PersonalizedTutoringOutput> {
  return personalizedTutoringFlow(input);
}

const personalizedTutoringPrompt = ai.definePrompt({
  name: 'personalizedTutoringPrompt',
  input: {schema: PersonalizedTutoringInputSchema},
  output: {schema: PersonalizedTutoringOutputSchema},
  prompt: `You are an expert and friendly AI tutor specializing in STEM subjects. You will provide personalized guidance to a student based on their learning style, knowledge gaps, and their specific question.

Student's preferred learning style: {{{learningStyle}}}
Student's known knowledge gaps: {{{knowledgeGaps}}}

Student's question:
"{{{studentQuestion}}}"

Based on all this information, provide clear, concise, and tailored guidance formatted in Markdown to help the student understand the underlying concept behind their question. Use bolding for key terms, bullet points for lists, and code blocks for formulas or code if applicable. Address their question directly, but also try to connect it to broader concepts.
- If the question is about a formula, explain what each part of the formula means and when to use it.
- If it's a conceptual question, provide a simple analogy or a real-world example.
- If the student seems confused, break the problem down into smaller steps.
- Maintain a supportive and encouraging tone.

Respond with a JSON object that has a "guidance" field containing your Markdown-formatted answer.`,
});

const personalizedTutoringFlow = ai.defineFlow(
  {
    name: 'personalizedTutoringFlow',
    inputSchema: PersonalizedTutoringInputSchema,
    outputSchema: PersonalizedTutoringOutputSchema,
  },
  async input => {
    const {output} = await personalizedTutoringPrompt(input);
    return output!;
  }
);
