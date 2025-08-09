import React from "react";

interface GuidePanelProps {
  videoUrl: string,
  topicTitle: string,
  helpfulSnippet: string,
  invert: boolean
}

function GuidePanel({ videoUrl, topicTitle, helpfulSnippet, invert }: GuidePanelProps) {
  return (
    <div className={`flex flex-col ${invert ? "lg:flex-row-reverse" : "lg:flex-row"} gap-6 rounded-lg p-4 items-start w-full mx-auto`}>
      {/* Video */}
      <div className="w-full aspect-video rounded-lg border-2 border-primary">
        <iframe
          className="w-full h-full rounded-lg"
          src={videoUrl}
          title={topicTitle}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      </div>

      {/* Text */}
      <div className="flex flex-col lg:w-6/12 justify-start">
        <h4 className="text-5xl text-primary mb-2">{topicTitle}</h4>
        <p className="text-xl font-bold text-base-content">{helpfulSnippet}</p>
      </div>
    </div>
  );
}

export default GuidePanel;

