import React, { useState, useEffect } from "react";

export default function Project({ filename }) {
    const [videoUrl, setVideoUrl] = useState([]);
    const [title, setTitle] = useState([]);
    const [imgUrl, setImgUrl] = useState([]);
    const [description, setDescription] = useState("");
    const [techStack, setTechStack] = useState("");
    const [Link, setLink] = useState({});
    const [currentImage, setCurrentImage] = useState(0);
    const [isVideo, setIsVideo] = useState(false);

    useEffect(() => {
        console.log("projects/" + filename + ".json");
        fetch("projects/" + filename + ".json")
            .then((response) => response.json())
            .then((data) => {
                setTitle(data.title);
                setImgUrl(data.imgUrl);
                setDescription(data.description);
                setTechStack(data.techStack);
                //TODOchange to linkname:link dictionary.
                setLink(data.Link);
                setVideoUrl(data.videoUrl);
            })
            .catch((error) => console.error("Error fetching project data:", error));
    }, [filename]);

    return (
        <div className="border-2 flex flex-row justify-between p-2 rounded-md items-start bg-[#001f3f] text-[#FFFDD0]">
                <div className="w-[70%] h-[600px] flex flex-row space-x-2">
                    {imgUrl.length + videoUrl.length > 1 ? (
                        <div className="relative w-full h-full">
                            <button
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                                onClick={() => setCurrentImage((currentImage - 1 + (imgUrl.length+videoUrl.length)) % imgUrl.length+videoUrl.length)}
                            >
                                &#10094;
                            </button>
                            {currentImage < imgUrl.length ? (
                                <img className="w-full h-full object-contain" src={"images/"+imgUrl[currentImage]} alt={`Project by Kevin ${currentImage + 1}`} />
                            ): (
                                <iframe
                                    className="w-full h-full"
                                    src={videoUrl[currentImage - imgUrl.length]}
                                    title={`Project video by Kevin`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )} 
                            <button
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                                onClick={() => setCurrentImage((currentImage + 1) % imgUrl.length+videoUrl.length)}
                            >
                                &#10095;
                            </button>
                        </div>
                    ) : (

                        imgUrl.length > 0 ? (
                            <img className="w-full h-full object-contain" src={"images/"+imgUrl[0]} alt={`Project by Kevin ${currentImage + 1}`} />
                        ) : (
                            <iframe
                                className="w-full h-full"
                                src={videoUrl[0]}
                                title={`Project video by Kevin`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )
                    )}
                </div>

            <div className="w-[30%] flex flex-col justify-start space-y-4 pl-4 pt-4">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row space-x-2 items-center">
                        <p className="text-xl">
                            <strong>{title}</strong>
                        </p>
                    </div>
                </div>
                <p className="text-sm">{description}</p>
                <p className="text-sm">{techStack}</p>
                {Object.keys(Link).length !== 0 && (
                    Object.entries(Link).map(([key, value]) => (
                        <a
                            key={key}
                            href={value}
                            className="text-blue-500 text-sm"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {key}
                        </a>
                    ))
                )}
            </div>
        </div>
    );
}