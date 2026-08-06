
import Image from "next/image";

export type Article = {
  id: number;
  title: string;
  date: string;
  image: string;
};

interface PopularArticlesProps {
  items?: Article[];
}

export default function PopularArticles({ items = [] }: PopularArticlesProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="w-full bg-[#FFFFFF] pb-20 pr-6 pt-10" style={{ paddingLeft: '39px' }}>
      <h2 className="mb-8 text-xl sm:text-2xl md:text-4xl font-bold text-[#335ECE]">
        Popular
      </h2>

      <div className="grid grid-cols-1 gap-x-10 gap-y-6 max-w-7xl">
        {items.map((article) => (
          <article
            key={article.id}
            className="flex items-center gap-4 transition-all hover:opacity-80 cursor-pointer"
          >
            <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-sm bg-gray-100">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[14px] font-medium text-[#666666] mb-1">
                Article • <span className="text-[#335ECE]">{article.date}</span>
              </p>
              <h3 className="text-[17px] font-bold text-[#666666] leading-tight hover:text-[#335ECE] transition-colors">
                {article.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}