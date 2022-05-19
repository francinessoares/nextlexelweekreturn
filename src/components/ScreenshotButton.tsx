import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "./Loading";

interface ScreenshotButtonProps {
    screenshot: any;
    onScreenshotTook: (screenshot: string) => void;
}

export function ScreenshotButton({ screenshot, onScreenshotTook }: ScreenshotButtonProps) {
    const [isTalkingScreenshot, setIsTakingScreenshot] = useState(false)

    async function handleTakeScreenshot() {
        setIsTakingScreenshot(true);

        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL('image/png');

        onScreenshotTook(base64image);
        setIsTakingScreenshot(false);
    }

    if (screenshot) {
        return (
            <button
                type="button"
                className="p-1 2-10 h-10 rounded-md border-md border-transprarent flex justify-end items-end text-zinc-400"
                style={{
                    backgroundImage: `url(${screenshot})`, 
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180,
                }}
            >
                <Trash weight="fill" />
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={handleTakeScreenshot}
            className="p-2 bg-zinc-880 roudend-md border-transparent hover:bg-zinc-700"
        >
            {isTalkingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
        </button>
    )
}