import { CelestialAtelierBackground } from "./src/components/celestial/CelestialAtelierBackground";
import { Hero } from "./components/Hero";
import { ProjectCard } from "./components/ProjectCard";

const projects = [
  {
    title: "Project One",
    description: "A stunning web application with a focus on user experience.",
    imageUrl: "https://via.placeholder.com/400x225",
  },
  {
    title: "Project Two",
    description: "An innovative mobile app that solves a real-world problem.",
    imageUrl: "https://via.placeholder.com/400x225",
  },
  {
    title: "Project Three",
    description: "A data visualization dashboard with complex interactions.",
    imageUrl: "https://via.placeholder.com/400x225",
  },
];

function App() {
  return (
    <main>
      <CelestialAtelierBackground />
      <Hero />

      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">My Work</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

      <section className="relative h-96 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url(https://via.placeholder.com/1920x1080)" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-20 flex h-full items-center justify-center">
          <h2 className="text-4xl font-bold text-white">A Section with Depth</h2>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="mb-4 text-4xl font-bold">About Me</h2>
        <p className="mx-auto max-w-3xl text-lg text-gray-300">
          I am a passionate developer who loves creating beautiful and functional digital experiences. My goal is to blend design and technology to build products that not only work well but also feel great to use.
        </p>
      </section>
    </main>
  );
}

export default App;