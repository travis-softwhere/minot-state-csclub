'use server';

import { db } from '@/db';
import { electionCandidates } from '@/db/schema';

export async function submitCandidacy(formData: {
  name: string;
  email: string;
  positions: string[];
  statement: string;
  imageData: string;
}) {
  try {
    await db.insert(electionCandidates).values({
      name: formData.name,
      email: formData.email,
      positions: formData.positions.join(','),
      statement: formData.statement,
      image_data: formData.imageData,
    });

    // Send email notification
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Positions: ${formData.positions.join(', ')}

Candidate Statement:
${formData.statement}
    `;

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'CS Club <csclub@minotstateu.edu>',
        to: 'csclub@minotstateu.edu',
        subject: `CS Club Election - ${formData.name}`,
        text: emailBody,
      }),
    });

    return { success: true };
  } catch (error) {
    console.error('Error submitting candidacy:', error);
    return { success: false, error: 'Failed to submit candidacy' };
  }
} 