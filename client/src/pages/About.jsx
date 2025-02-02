import { BookOpen, Code2, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 to-white dark:from-[#18181b] dark:to-[#18181b]">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-clip-text text-black dark:text-violet-800">
            About Harmonia
          </h1>
          <p className="text-lg text-muted-foreground dark:text-gray-300">
            A space for sharing knowledge, fostering community, and exploring
            technology
          </p>
        </div>

        {/* Main Content */}
        <div className="p-8 bg-gradient-to-b from-violet-200 to-violet-100 dark:from-transparent dark:to-black shadow-xl shadow-black/50 backdrop-blur-sm rounded-xl dark:shadow-violet-800/20">
          <div className="prose prose-lg max-w-none">
            <p className="leading-relaxed text-card-foreground dark:text-white">
              Welcome to Harmonia! This blog was created by Sahand Ghavidel as a
              personal project to share his thoughts and ideas with the world.
              Sahand is a passionate developer who loves to write about
              technology, coding, and everything in between.
            </p>

            <div className="w-full h-px bg-border my-8" />

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-violet-300 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 dark:text-violet-300">
                  Weekly Articles
                </h3>
                <p className="text-sm text-muted-foreground dark:text-white">
                  Fresh content on web development and software engineering
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-violet-300 flex items-center justify-center mb-4">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 dark:text-violet-300">
                  Practical Tutorials
                </h3>
                <p className="text-sm text-muted-foreground dark:text-white">
                  Step-by-step guides on programming languages and technologies
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-violet-300 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 dark:text-violet-300">
                  Active Community
                </h3>
                <p className="text-sm text-muted-foreground dark:text-white">
                  Engage with fellow developers through comments and discussions
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-border my-8" />

            <div className="space-y-6">
              <p className="leading-relaxed text-card-foreground dark:text-violet-200">
                On this blog, you&apos;ll find weekly articles and tutorials on
                topics such as web development, software engineering, and
                programming languages. Sahand is always learning and exploring
                new technologies, so be sure to check back often for new
                content!
              </p>

              <p className="leading-relaxed text-card-foreground dark:text-violet-400">
                We encourage you to leave comments on our posts and engage with
                other readers. You can like other people&apos;s comments and
                reply to them as well. We believe that a community of learners
                can help each other grow and improve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
