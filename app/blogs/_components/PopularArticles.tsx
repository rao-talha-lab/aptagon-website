import Image from "next/image";

type Article = {
  id: number;
  title: string;
  date: string;
  image: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: "Building Trust Through Consistent UI",
    date: "10 July 2025",
    image: "/blogs/popular/image-1.jpg",
  },
  {
    id: 2,
    title: "AI-Driven Product Design Revolution",
    date: "10 July 2025",
    image: "/blogs/popular/image-2.jpg",
  },
  {
    id: 3,
    title: "Smarter Documentation for Agile Teams",
    date: "8 July 2025",
    image: "/blogs/popular/image-3.jpg",
  },
  {
    id: 4,
    title: "Mastering Visual Hierarchy in UX",
    date: "24 June 2025",
    image: "/blogs/popular/image-4.jpg",
  },
];

export default function PopularArticles() {
  return (
    // Background set to white, padding-left set to 39px
    <section className="w-full bg-[#FFFFFF] pb-20 pr-6" style={{ paddingLeft: '39px' }}>
      <h2 className="mb-8 text-xl sm:text-2xl md:text-4xl font-bold text-[#335ECE]">
        Popular
      </h2>

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-1
          gap-x-10
          gap-y-6
          max-w-7xl
        "
      >
        {articles.map((article) => (
          <article
            key={article.id}
            className="flex items-center gap-4 transition-all hover:opacity-80 cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-sm bg-gray-100">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content Container */}
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