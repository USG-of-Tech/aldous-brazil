'use client';

import { rubric } from "@/app/utils/supabaseHelpers";
import { useState } from "react";

function RubricPanel() {
    const [topicA, setTopicA] = useState("");
    const [topicB, setTopicB] = useState("");
    const [useTopicB, setUseTopicB] = useState(true);

    return (
        <fieldset className="bg-black p-4 border-2 border-primary rounded-2xl w-full">
            <h4 className="text-7xl">Committee Info</h4>
            <div className="grid grid-cols-2 gap-4">
                {/* Topic A */}
                <div className="flex flex-col">
                    <h6 className="text-4xl">Topic A: </h6>
                    <input 
                        type="text" 
                        className="input input-lg w-full" 
                        placeholder="Culling the Squirrel Population" 
                        value={topicA}
                        onChange={(event) => setTopicA(event.target.value)}/>
                </div>
                {/* Topic B */}
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <h6 className={`text-4xl ${useTopicB ? "" : "text-gray-500"}`}>Topic B: </h6>
                        <label className="label text-lg">
                            <input type="checkbox" checked={useTopicB} className="toggle toggle-primary" onChange={(_) => setUseTopicB(!useTopicB)} />
                            
                        </label>
                    </div>
                    <input 
                        type="text" 
                        className="input input-lg w-full" 
                        placeholder="Locating Oski's Hidden Treasure" 
                        value={topicA}
                        disabled={!useTopicB}
                        onChange={(event) => setTopicA(event.target.value)}/>
                </div>
            </div>
        </fieldset>
    )
}

export default RubricPanel;