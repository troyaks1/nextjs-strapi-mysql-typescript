import { Button } from "@/components/ui/button"

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";
  try {
    const res = await fetch(baseUrl + path);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  console.log(strapiData)
  const { title, description } = strapiData.data.attributes;

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{description}</p>
      <Button>
        Click me, I don't do anything
      </Button>
    </main>
  )
}
