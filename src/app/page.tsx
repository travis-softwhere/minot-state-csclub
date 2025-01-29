"use client"
import Image from "next/image"
import Hero from "@/components/Hero"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Hero />
      <section className="flex-1 max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-1 p-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Welcome to MSU CS Club</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Join us in exploring the exciting world of computer science! Our club offers opportunities for learning,
                collaboration, and growth in various areas of technology.
              </p>
              <div className="space-y-4 text-gray-600">
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                  Weekly meetings and workshops
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                  Hands-on programming projects
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                  Networking with industry professionals
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                  Access to learning resources and tutorials
                </p>
              </div>
            </div>
            <div className="md:w-1/3 p-8 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700">
              <div className="relative w-full max-w-[300px] aspect-square">
                <Image src="/CSimage.jpg" alt="CS Club Logo" fill className="object-contain" priority />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}