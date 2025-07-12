import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import clsx from 'clsx';
export default function SwiperDicas({ dicasSaude, setDicaIndex, dicaIndex }) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-6 flex flex-col relative min-h-[200px]">
            <p className="text-purple-700 font-medium text-lg text-center my-auto flex items-center justify-center">
                {dicasSaude[dicaIndex]}
            </p>
            <div className="flex justify-center mt-4 space-x-2">
                {dicasSaude.map((_, i) => (
                    <div
                        key={i}
                        className={clsx(
                            'w-2.5 h-2.5 rounded-full transition-all',
                            dicaIndex === i ? 'bg-purple-600 scale-110' : 'bg-gray-300'
                        )}
                    />
                ))}
            </div>
            <button
                onClick={() => setDicaIndex((dicaIndex - 1 + dicasSaude.length) % dicasSaude.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-700"
            >
                <BsArrowLeft size={14} />
            </button>
            <button
                onClick={() => setDicaIndex((dicaIndex + 1) % dicasSaude.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-700"
            >
                <BsArrowRight size={14} />
            </button>
        </div>
    );
}