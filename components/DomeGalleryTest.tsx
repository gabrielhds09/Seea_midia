'use client'

import React from 'react'
import Image from 'next/image'

// MINIMAL TEST VERSION - Just to see if ANYTHING renders
export default function DomeGalleryTest() {
    const testImages = [
        '/thumbnails/thumb-01.jpg',
        '/thumbnails/thumb-02.jpg',
        '/thumbnails/thumb-03.jpg',
    ]

    return (
        <div className="w-full h-screen bg-black flex items-center justify-center">
            <div className="text-white text-center">
                <h1 className="text-4xl mb-8">TEST GALLERY</h1>
                <div className="flex gap-4">
                    {testImages.map((src, i) => (
                        <div key={i} className="w-40 h-40 bg-red-500 border-2 border-white">
                            <img
                                src={src}
                                alt={`Test ${i}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                <p className="mt-4 text-gray-400">If you see images above, files exist. If red boxes, path issue.</p>
            </div>
        </div>
    )
}
