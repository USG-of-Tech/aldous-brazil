import React from "react";

import Image from 'next/image';

interface GuidePanelProps {
  // videoUrl: string,
  topicTitle: string,
  helpfulSnippet: string,
  invert: boolean
}

function GuidePanel({ topicTitle, helpfulSnippet, invert }: GuidePanelProps) {
  return (
    <div className={`flex flex-col bg-black border-2 border-primary p-4 ${invert ? "lg:flex-row-reverse" : "lg:flex-row"} gap-6 rounded-lg p-4 items-start w-full mx-auto`}>
      {/* Video */}
      <div className="w-full aspect-video rounded-lg border-2 border-base-300 flex flex-row items-center justify-center">
        {invert ? 
          <Image
            src="/ProfileInfo.png"
            alt="Reg Guide"
            width={650}
            height={200}
          />
          :
          <Image
            src="/RegScreenshot.png"
            alt="Reg Guide"
            width={650}
            height={200}
          />
        }
        {/* <iframe
          className="w-full h-full rounded-lg"
          src={videoUrl}
          title={topicTitle}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe> */}
      </div>

      {/* Text */}
      <div className="flex flex-col lg:w-9/12 justify-start">
        <h4 className="text-5xl text-primary mb-2">{topicTitle}</h4>
        <p className="text-xl font-bold text-base-content">{helpfulSnippet}</p>
      </div>
    </div>
  );
}

export default GuidePanel;

