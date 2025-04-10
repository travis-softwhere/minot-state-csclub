"use client";

import Link from "next/link"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"
import { submitCandidacy } from "@/app/actions/election"
import { useState } from "react"

const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // Maximum dimensions
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 800;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                // Reduce quality to minimize file size
                const resizedImage = canvas.toDataURL('image/jpeg', 0.7);
                console.log('Original size:', file.size / 1024 / 1024, 'MB');
                console.log('Resized size:', resizedImage.length / 1024 / 1024, 'MB');
                console.log('Image starts with:', resizedImage.substring(0, 50));
                resolve(resizedImage);
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    });
};

export default function Hero() {
    const HeroContent = () => {
        const [formStatus, setFormStatus] = useState<{ success?: boolean; error?: string }>({});
        const [imagePreview, setImagePreview] = useState<string | null>(null);
        const positions = ['President', 'Vice President', 'Treasurer', 'Secretary', 'Communications Director'];

        const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                if (file.size > 10000000) { // 10MB limit for original file
                    setFormStatus({ error: 'Image must be less than 10MB' });
                    return;
                }
                try {
                    console.log('Processing image:', file.name);
                    const resizedImageData = await resizeImage(file);
                    setImagePreview(resizedImageData);
                    setFormStatus({});
                } catch (error) {
                    console.error('Error processing image:', error);
                    setFormStatus({ error: 'Error processing image. Please try another image.' });
                }
            }
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            
            if (!imagePreview) {
                setFormStatus({ error: 'Please select a profile image' });
                return;
            }

            try {
                const formData = {
                    name: (form.elements.namedItem('name') as HTMLInputElement).value,
                    email: (form.elements.namedItem('email') as HTMLInputElement).value,
                    positions: positions.filter(pos => 
                        (form.elements.namedItem(pos.toLowerCase().replace(/\s+/g, '-')) as HTMLInputElement).checked
                    ),
                    statement: (form.elements.namedItem('statement') as HTMLTextAreaElement).value,
                    imageData: imagePreview
                };

                console.log('Submitting form with image size:', formData.imageData.length / 1024 / 1024, 'MB');
                const result = await submitCandidacy(formData);
                setFormStatus(result);

                if (result.success) {
                    form.reset();
                    setImagePreview(null);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                setFormStatus({ error: 'Failed to submit form. Please try again.' });
            }
        };

        return (
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16 px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
                    <div className="lg:w-1/2 bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">CS Club Elections</h2>
                        <p className="text-gray-600 mb-4">Voting for President will be held on Wedneday, April 16, 2025. The rest of the elections will be held on the following Wednesday. Interested in running for president? Fill out the form below!</p>
                        
                        {formStatus.success && (
                            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                                Your candidacy has been submitted successfully!
                            </div>
                        )}
                        {formStatus.error && (
                            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                                {formStatus.error}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                />
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    required
                                    onChange={handleImageChange}
                                    className="mt-1 block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                                />
                                {imagePreview && (
                                    <div className="mt-2">
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            className="w-32 h-32 object-cover rounded-full border-2 border-red-500"
                                        />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Positions of Interest</label>
                                <div className="space-y-2">
                                    {positions.map((position) => (
                                        <div key={position} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={position.toLowerCase().replace(/\s+/g, '-')}
                                                name={position.toLowerCase().replace(/\s+/g, '-')}
                                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                            />
                                            <label htmlFor={position.toLowerCase().replace(/\s+/g, '-')} className="ml-2 text-sm text-gray-700">
                                                {position}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="statement" className="block text-sm font-medium text-gray-700 mb-1">Candidate Statement</label>
                                <textarea
                                    id="statement"
                                    name="statement"
                                    rows={4}
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                    placeholder="Tell us why you want to run for office and what you hope to accomplish..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition duration-200 text-lg font-medium"
                            >
                                Submit Candidacy
                            </button>
                        </form>
                    </div>

                    <div className="lg:w-1/2">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">CS Club Meeting!</h1>
                        <p className="mt-6 text-xl sm:text-2xl max-w-3xl text-white">
                            Join us on Wednesdays at 3:00 in Model 113. We're looking for people to help with:
                        </p>

                        <ul className="mt-4 text-lg sm:text-xl list-disc list-inside space-y-2 text-white">
                            <li>AI / Data Science research</li>
                            <li>Web application development</li>
                            <li>Robotics</li>
                            <li><Link href="/news" className="underline">Midwestern Instruction and Computing Symposium</Link></li>
                            <li>Getting more involved in the CS Club</li>
                        </ul>

                        {/*<p className="mt-6 text-2xl font-semibold">Free Pizza for all attendees!</p>*/}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <NoSSR>
            {isNativeApp() ? (
                <HeroContent />
            ) : (
                <section className="relative overflow-hidden">
                    <HeroContent />
                </section>
            )}
        </NoSSR>
    )
}