import { ArticleSection } from "@/components/custom/ArticleSection";
import { FeatureSection } from "@/components/custom/FeaturesSection";
import { HeroSection } from "@/components/custom/HeroSection";
import { getHomePageData } from "@/data/loaders";
import { flattenAttributes } from "@/lib/utils";
import qs from "qs";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: {
          populate: true,
        },
        feature: {
          populate: true,
        }
      },
    },
  },
});

// async function getStrapiData(path: string) {
//   const baseUrl = "http://localhost:1337";
//   const url = new URL(path, baseUrl);
//   url.search = homePageQuery;

//   try {
//     const response = await fetch(url.href, { cache: "no-store" });
//     const data = await response.json();
//     const flattenedData = flattenAttributes(data);
//     //console.dir(flattenedData, { depth: null });
//     return flattenedData;
//   } catch (error) {
//     console.error(error);
//   }
// }

function blockRenderer(block: any) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection key={block.id} data={block} />;
    case "layout.features-section":
      return <FeatureSection key={block.id} data={block} />;
    default:
      return null;
  }
}

export default async function Home() {
  const strapiData = await getHomePageData();

  const { blocks } = strapiData;
  if (!blocks) return <p>No sections found</p>;

  return <main>{blocks.map(blockRenderer)}</main>;
}
