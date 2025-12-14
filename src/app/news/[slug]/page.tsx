"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, Eye, Share2, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { notFound } from "next/navigation";

const newsArticles = [
  {
    id: 1,
    title: "Prime Agro Farm Wins Uganda's Best Farmer 2025",
    slug: "best-farmer-2025",
    excerpt: "Sebastian Rutah Ngambwa recognized for outstanding contributions to agricultural excellence and innovation in dairy farming.",
    content: `
      <p>In a momentous achievement for Prime Agro Farm, our founder and managing director, Sebastian Rutah Ngambwa, has been awarded the prestigious title of Uganda's Best Farmer 2025. This recognition celebrates his outstanding contributions to agricultural excellence and innovation in dairy farming.</p>
      
      <p>The award ceremony, held at the Kampala Serena Hotel, brought together agricultural leaders, government officials, and industry stakeholders from across East Africa. The Minister of Agriculture, Animal Industry and Fisheries praised Sebastian's vision in transforming dairy farming practices through modern technology and sustainable approaches.</p>
      
      <h2>Journey to Excellence</h2>
      <p>Since establishing Prime Agro Farm in 2012, Sebastian has been at the forefront of revolutionizing dairy farming in Uganda. Starting with just 50 dairy cattle, the farm has grown exponentially to house over 500 cattle today, becoming one of the region's most advanced dairy operations.</p>
      
      <p>The farm's success stems from its commitment to implementing cutting-edge technology, including automated milking systems, precision feeding programs, and comprehensive health management protocols. These innovations have not only increased productivity but also significantly improved animal welfare standards.</p>
      
      <h2>Community Impact</h2>
      <p>Beyond commercial success, Prime Agro Farm has made substantial contributions to the local farming community. Through regular training workshops and mentorship programs, the farm has empowered over 1,000 local farmers with modern agricultural techniques and business management skills.</p>
      
      <p>"This award is not just for me, but for every farmer who believes in the future of agriculture in Uganda," Sebastian stated during his acceptance speech. "We must continue to innovate, educate, and elevate our farming practices to meet the growing demands of our nation."</p>
      
      <h2>Looking Ahead</h2>
      <p>With this recognition, Prime Agro Farm is poised to expand its operations and educational initiatives. Plans are underway to establish a model training center that will serve as a hub for agricultural education and innovation in the region.</p>
      
      <p>The farm's success story demonstrates that with dedication, innovation, and community focus, Ugandan agriculture can compete on a global stage while maintaining sustainable and ethical practices.</p>
    `,
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200",
    date: "2025-01-15",
    views: 3456,
    category: "Awards",
  },
  {
    id: 2,
    title: "New Automated Milking System Installation Complete",
    slug: "new-milking-system",
    excerpt: "Modernizing our dairy operations with cutting-edge robotic milking technology for improved efficiency and animal welfare.",
    content: `
      <p>Prime Agro Farm has completed the installation of a state-of-the-art automated milking system, marking a significant milestone in our commitment to technological advancement and animal welfare. This investment of over 500 million UGX represents our dedication to providing the best possible care for our dairy herd while maximizing operational efficiency.</p>
      
      <h2>Revolutionary Technology</h2>
      <p>The new robotic milking system allows cows to be milked on their own schedule, reducing stress and increasing comfort. Each cow wears a collar with an electronic tag that the system reads to customize the milking process, track production, and monitor health indicators.</p>
      
      <p>Key features of the system include:</p>
      <ul>
        <li>24/7 automated milking capability</li>
        <li>Individual cow health monitoring</li>
        <li>Precise feed dispensing during milking</li>
        <li>Real-time production data and analytics</li>
        <li>Automated cleaning and sanitization</li>
      </ul>
      
      <h2>Benefits for Animal Welfare</h2>
      <p>The voluntary milking system significantly improves animal welfare by allowing cows to follow their natural rhythms. Studies have shown that cows using robotic milking systems experience less stress, produce more milk, and have better overall health outcomes.</p>
      
      <p>"Our cows' wellbeing is paramount," explains our farm veterinarian, Dr. Sarah Nakato. "This system gives them the freedom to choose when they want to be milked, which aligns with their natural behavior and reduces stress considerably."</p>
      
      <h2>Operational Excellence</h2>
      <p>The new system processes detailed data on each cow's milk production, quality, and health. This information enables our team to make informed decisions about nutrition, breeding, and healthcare, optimizing both animal welfare and farm productivity.</p>
      
      <p>Early results show a 15% increase in milk production and a 20% reduction in labor costs, while also improving milk quality metrics. The system's predictive capabilities help identify health issues before they become serious, leading to better veterinary outcomes.</p>
      
      <h2>Training and Adaptation</h2>
      <p>Our team has undergone comprehensive training to operate and maintain the new system. We've also opened our doors to other farmers interested in seeing the technology in action, as part of our commitment to advancing agricultural practices across Uganda.</p>
    `,
    image: "https://images.unsplash.com/photo-1594771804886-a933bb2d609b?w=1200",
    date: "2024-12-01",
    views: 2189,
    category: "Technology",
  },
  {
    id: 3,
    title: "Community Training Program Reaches 1000 Farmers",
    slug: "community-training-milestone",
    excerpt: "A milestone achievement in our commitment to empowering local farmers with modern agricultural techniques.",
    content: `
      <p>Prime Agro Farm is proud to announce that our Community Training Program has successfully trained its 1,000th farmer. This milestone represents years of dedication to agricultural education and community empowerment throughout the region.</p>
      
      <h2>Program Overview</h2>
      <p>Launched in 2018, the Community Training Program offers hands-on workshops covering modern dairy farming techniques, sustainable agriculture practices, and agricultural business management. The program is designed to be accessible to farmers of all experience levels, from beginners to established operators looking to upgrade their skills.</p>
      
      <p>Training modules include:</p>
      <ul>
        <li>Modern dairy cattle management</li>
        <li>Feed production and nutrition</li>
        <li>Breeding and genetics</li>
        <li>Disease prevention and control</li>
        <li>Business planning and financial management</li>
        <li>Sustainable farming practices</li>
      </ul>
      
      <h2>Real-World Impact</h2>
      <p>The program's impact extends far beyond numbers. Participating farmers report an average 40% increase in productivity and a 30% improvement in income within the first year of implementing learned techniques.</p>
      
      <p>Jane Namukasa, a dairy farmer from Masaka District, shares her experience: "Before attending the training, I was struggling with low milk production and frequent cattle diseases. The knowledge I gained transformed my farm. My production has doubled, and my animals are healthier than ever."</p>
      
      <h2>Community Partnerships</h2>
      <p>The program's success is built on strong partnerships with local government, agricultural cooperatives, and industry organizations. These collaborations ensure that training remains relevant, accessible, and aligned with community needs.</p>
      
      <p>We've also established a mentorship network where program graduates can continue to receive guidance and share their experiences with newer participants, creating a sustainable cycle of knowledge transfer.</p>
      
      <h2>Looking to the Future</h2>
      <p>Building on this success, Prime Agro Farm is expanding the program to include specialized tracks for young farmers and women in agriculture. We're also developing online learning modules to reach even more farmers across Uganda and neighboring countries.</p>
      
      <p>"Education is the foundation of agricultural transformation," says Sebastian Rutah Ngambwa. "By sharing our knowledge and experience, we're not just training farmers – we're building a stronger, more sustainable agricultural sector for Uganda."</p>
    `,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200",
    date: "2024-11-15",
    views: 1876,
    category: "Community",
  },
  {
    id: 4,
    title: "Expanding Our Silage Production Capacity",
    slug: "silage-expansion",
    excerpt: "New storage facilities and equipment to meet growing demand for quality animal feed in the region.",
    content: `
      <p>Prime Agro Farm is significantly expanding its silage production capacity with the construction of new storage facilities and acquisition of modern equipment. This expansion will increase our production capacity by 60%, enabling us to better serve our own herd while supplying quality feed to farmers throughout the region.</p>
      
      <h2>Meeting Growing Demand</h2>
      <p>The demand for high-quality silage has grown substantially as more farmers recognize the importance of consistent, nutritious feed for optimal dairy production. Our expansion will add three new storage bunkers with a combined capacity of 5,000 tons, bringing our total storage capacity to over 12,000 tons.</p>
      
      <h2>New Equipment and Technology</h2>
      <p>To support this expansion, we've invested in:</p>
      <ul>
        <li>High-capacity forage harvesters</li>
        <li>Precision-cut choppers for optimal particle size</li>
        <li>Specialized packing equipment for better compaction</li>
        <li>Covered storage bunkers for quality preservation</li>
        <li>Moisture monitoring systems</li>
      </ul>
      
      <h2>Quality Assurance</h2>
      <p>Our silage production process follows strict quality control protocols, from seed selection through harvesting at optimal moisture content, to proper compaction and sealing. Regular testing ensures consistent nutritional value and fermentation quality.</p>
      
      <p>"Good silage is the foundation of successful dairy farming," explains our feed specialist, John Mukasa. "With our expanded capacity and quality controls, we're ensuring that local farmers have access to feed that meets international standards."</p>
      
      <h2>Environmental Benefits</h2>
      <p>The expansion incorporates sustainable practices including:</p>
      <ul>
        <li>Runoff management systems to protect water sources</li>
        <li>Composting of organic waste</li>
        <li>Efficient water usage in processing</li>
        <li>Solar power for facility operations</li>
      </ul>
      
      <h2>Community Impact</h2>
      <p>The expansion creates new employment opportunities and provides a reliable source of quality feed for local dairy farmers. We're also offering volume discounts to small-scale farmers and flexible payment terms to ensure accessibility.</p>
      
      <p>Production from the new facilities is expected to begin in the next quarter, with full capacity anticipated within six months. Pre-orders are now being accepted for the upcoming season.</p>
    `,
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1200",
    date: "2024-10-20",
    views: 1234,
    category: "Operations",
  },
  {
    id: 5,
    title: "Partnership with Agricultural Research Institute",
    slug: "research-partnership",
    excerpt: "Collaborating with leading researchers to advance sustainable farming practices in East Africa.",
    content: `
      <p>Prime Agro Farm has entered into a strategic partnership with the National Agricultural Research Organisation (NARO) to advance sustainable farming practices and dairy technology in East Africa. This collaboration brings together practical farming experience with cutting-edge agricultural research.</p>
      
      <h2>Partnership Goals</h2>
      <p>The three-year partnership focuses on several key areas:</p>
      <ul>
        <li>Development of climate-resilient forage varieties</li>
        <li>Optimization of breeding programs for tropical conditions</li>
        <li>Research on sustainable feed production</li>
        <li>Studies on disease resistance and prevention</li>
        <li>Evaluation of new farming technologies</li>
      </ul>
      
      <h2>Real-World Laboratory</h2>
      <p>Prime Agro Farm will serve as a living laboratory where new technologies and practices can be tested under real farming conditions. This practical approach ensures that research outcomes are immediately applicable to working farms.</p>
      
      <p>Dr. James Oloya, lead researcher from NARO, explains: "This partnership allows us to validate our research in real-world conditions and get immediate feedback from experienced farmers. It's an invaluable opportunity to accelerate agricultural innovation."</p>
      
      <h2>Knowledge Sharing</h2>
      <p>Research findings will be shared through:</p>
      <ul>
        <li>Regular field days for local farmers</li>
        <li>Published case studies and reports</li>
        <li>Training workshops and demonstrations</li>
        <li>Online resources and webinars</li>
      </ul>
      
      <h2>Focus on Sustainability</h2>
      <p>A key focus of the partnership is developing farming practices that are both productive and environmentally sustainable. Research areas include water conservation, carbon footprint reduction, and biodiversity preservation.</p>
      
      <h2>Regional Impact</h2>
      <p>While based in Uganda, the partnership aims to generate insights applicable across East Africa. By addressing challenges common to the region's agricultural sector, the collaboration seeks to benefit farming communities throughout the area.</p>
      
      <p>"Innovation through collaboration is the future of agriculture," says Sebastian Rutah Ngambwa. "By combining research excellence with practical farming knowledge, we can solve real problems and create lasting impact for farmers across the region."</p>
    `,
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200",
    date: "2024-09-05",
    views: 987,
    category: "Partnerships",
  },
  {
    id: 6,
    title: "Youth Agriculture Program Launch",
    slug: "youth-program-launch",
    excerpt: "Introducing young people to modern farming careers through our new internship and mentorship program.",
    content: `
      <p>Prime Agro Farm is excited to launch our Youth Agriculture Program, designed to inspire and equip the next generation of agricultural leaders. This comprehensive initiative combines hands-on training, mentorship, and career development opportunities for young people interested in modern farming.</p>
      
      <h2>Addressing the Age Gap</h2>
      <p>With the average age of farmers in Uganda exceeding 60 years, attracting young people to agriculture is crucial for the sector's future. Our program showcases agriculture as a modern, technology-driven career path with excellent opportunities.</p>
      
      <h2>Program Components</h2>
      <p>The Youth Agriculture Program offers:</p>
      <ul>
        <li>Six-month internships with hands-on farm experience</li>
        <li>Mentorship from experienced agricultural professionals</li>
        <li>Training in modern farming technologies</li>
        <li>Business and entrepreneurship development</li>
        <li>Networking opportunities with industry leaders</li>
        <li>Financial literacy and farm management skills</li>
      </ul>
      
      <h2>Technology Focus</h2>
      <p>Young participants are introduced to cutting-edge agricultural technologies including automated systems, data analytics, precision farming tools, and sustainable practices. This exposure demonstrates that modern agriculture is far from traditional stereotypes.</p>
      
      <p>Brian Kimera, one of our first program participants, shares: "I always thought farming was outdated and low-tech. This program completely changed my perspective. I'm now planning to start my own modern dairy farm after graduation."</p>
      
      <h2>Career Pathways</h2>
      <p>The program doesn't just teach farming – it opens doors to diverse agricultural careers:</p>
      <ul>
        <li>Farm management and operations</li>
        <li>Agricultural technology specialists</li>
        <li>Veterinary and animal health</li>
        <li>Agricultural business and marketing</li>
        <li>Feed production and nutrition</li>
        <li>Farm extension and education</li>
      </ul>
      
      <h2>Scholarship Opportunities</h2>
      <p>In partnership with several agricultural universities, we offer scholarship opportunities for outstanding program graduates to pursue further education in agriculture-related fields. We also provide startup support for participants who want to launch their own agricultural ventures.</p>
      
      <h2>Community Engagement</h2>
      <p>Program participants are encouraged to share their knowledge with their communities, creating a multiplier effect. Many have started youth farming clubs in their villages, inspiring peers to consider agricultural careers.</p>
      
      <h2>Join the Movement</h2>
      <p>Applications for the next cohort are now open to youth aged 18-30 with an interest in agriculture. We're looking for enthusiastic individuals who want to be part of transforming Uganda's agricultural sector.</p>
      
      <p>"Young people are the future of agriculture," says Sebastian Rutah Ngambwa. "By investing in their education and showing them the opportunities in modern farming, we're ensuring a vibrant, innovative agricultural sector for generations to come."</p>
    `,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200",
    date: "2024-08-10",
    views: 1567,
    category: "Education",
  },
];

interface Props {
  params: Promise<{ slug: string }>;
}

export default function NewsArticlePage({ params }: Props) {
  const resolvedParams = use(params);
  const article = newsArticles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = newsArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 2);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <section className="relative py-20 gradient-green text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <nav className="flex items-center gap-2 text-white/70 mb-6 text-sm">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/news" className="hover:text-white transition-colors">
                News
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white line-clamp-1">{article.title}</span>
            </nav>

            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-xs font-medium px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full">
                {article.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-white/80 text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {article.views} views
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-12 shadow-2xl"
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <div className="grid lg:grid-cols-4 gap-12">
              <aside className="lg:col-span-1 space-y-6">
                <div className="sticky top-24">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-border">
                    <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share Article
                    </h3>
                    <div className="space-y-2">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <Facebook className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground">
                          Facebook
                        </span>
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <Twitter className="w-5 h-5 text-[#1DA1F2] group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground">
                          Twitter
                        </span>
                      </a>
                      <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${article.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <Linkedin className="w-5 h-5 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground">
                          LinkedIn
                        </span>
                      </a>
                      <a
                        href={`mailto:?subject=${article.title}&body=Check out this article: ${shareUrl}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <Mail className="w-5 h-5 text-primary-green group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground">
                          Email
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </aside>

              <article className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {relatedArticles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 pt-16 border-t border-border"
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-8">
                      Related Articles
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {relatedArticles.map((related) => (
                        <Link
                          key={related.id}
                          href={`/news/${related.slug}`}
                          className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                              src={related.image}
                              alt={related.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <span className="text-xs font-medium px-2 py-1 bg-primary-green/10 text-primary-green rounded-full">
                              {related.category}
                            </span>
                            <h3 className="text-lg font-bold text-foreground mt-3 mb-2 line-clamp-2 group-hover:text-primary-green transition-colors">
                              {related.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {related.excerpt}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 bg-gradient-to-br from-primary-green to-accent-green rounded-2xl p-8 text-white"
                >
                  <h3 className="text-2xl font-bold mb-3">
                    Stay Updated with Our Latest News
                  </h3>
                  <p className="text-white/90 mb-6">
                    Subscribe to our newsletter and never miss important updates from
                    Prime Agro Farm.
                  </p>
                  <Link
                    href="/news"
                    className="inline-flex items-center btn-primary bg-white text-primary-green hover:bg-white/90 group"
                  >
                    View All News
                    <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { use } from "react";
