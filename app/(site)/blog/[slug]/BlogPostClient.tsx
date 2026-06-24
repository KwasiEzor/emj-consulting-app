"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Calendar, Clock, ArrowLeft, Tag, Share2, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { getBlogPost, getBlogPosts } from "@/lib/data";

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-black/10 dark:bg-white/10">
      <div className="h-full bg-[#D4AF37] transition-none" style={{ width: `${progress}%` }} />
    </div>
  );
}

const fullContent: Record<string, string[]> = {
  "documents-visa-canada": [
    "Le Canada est l'une des destinations les plus prisées pour l'immigration et les études à l'étranger. Chaque année, des milliers de ressortissants africains déposent une demande de visa canadien, avec des taux de succès très variables selon la qualité du dossier présenté.",
    "La première étape cruciale est de rassembler tous les documents requis bien avant la date prévue du voyage. Un dossier incomplet est la principale cause de refus de visa. Voici les documents indispensables pour maximiser vos chances.",
    "Le passeport doit être valide au moins six mois après la date de retour prévue. Assurez-vous qu'il comporte au moins deux pages vierges. Les photos d'identité doivent respecter les normes biométriques canadiennes : fond blanc, format 35x45mm, prise de moins de six mois.",
    "La preuve de ressources financières est un élément déterminant. Les autorités canadiennes veulent s'assurer que vous pouvez subvenir à vos besoins pendant votre séjour. Un relevé bancaire des trois derniers mois est généralement exigé, montrant un solde suffisant et des mouvements réguliers.",
    "La lettre d'invitation d'un résident canadien, si applicable, renforce considérablement votre dossier. Elle doit mentionner la nature de votre relation avec l'invitant, la durée et l'objet de votre visite, ainsi que les dispositions prises pour votre hébergement.",
    "L'assurance voyage est obligatoire et doit couvrir au minimum 100 000 dollars canadiens de frais médicaux. Choisissez une police reconnue par les autorités canadiennes et vérifiez qu'elle couvre l'ensemble de votre séjour.",
    "Chez EMJ-Consulting, nous vous accompagnons dans la constitution de votre dossier de A à Z. Notre expertise et notre connaissance approfondie des exigences consulaires canadiennes garantissent des dossiers solides et complets.",
  ],
  "etudes-france-guide-complet": [
    "La France est la première destination mondiale pour les étudiants africains. Ses universités et grandes écoles offrent une formation d'excellence reconnue dans le monde entier. Mais le chemin vers un visa étudiant français peut sembler complexe.",
    "La première étape est le choix de votre établissement. La France propose plus de 3 500 établissements d'enseignement supérieur. Identifiez ceux qui correspondent à votre projet académique et vérifiez les conditions d'admission.",
    "Campus France est le portail officiel de candidature pour la plupart des pays africains. La procédure CEF (Centre pour les Études en France) est obligatoire pour les ressortissants de nombreux pays. Elle comprend un entretien d'évaluation de votre projet d'études.",
    "Une fois accepté par un établissement, vous devez constituer votre dossier de visa long séjour étudiant. Les documents requis incluent : le formulaire de demande complété, deux photos d'identité, votre passeport valide, l'attestation d'inscription, la preuve de ressources suffisantes et une assurance santé.",
    "Les ressources financières exigées correspondent à environ 615 euros par mois pour couvrir vos frais de subsistance. Un garant en France peut également vous soutenir dans votre demande.",
    "Le logement est souvent la première préoccupation des étudiants. Les Cités Universitaires (CROUS) offrent des hébergements abordables. Commencez vos recherches bien avant votre départ, car les places sont limitées.",
    "EMJ-Consulting vous accompagne dans toutes ces démarches, de la sélection de l'établissement jusqu'à l'obtention de votre visa. Notre réseau de partenaires en France facilite également votre intégration une fois arrivé.",
  ],
};

const defaultParagraphs = [
  "L'obtention d'un visa est une démarche qui nécessite une préparation minutieuse et une connaissance approfondie des exigences consulaires. Chez EMJ-Consulting, nous avons accompagné des centaines de clients avec un taux de succès exceptionnel.",
  "La clé du succès réside dans la qualité et la complétude du dossier présenté. Chaque pièce justificative doit être authentique, à jour et cohérente avec les informations déclarées dans le formulaire de demande.",
  "Les autorités consulaires accordent une attention particulière aux preuves d'attaches dans le pays d'origine : emploi stable, famille, propriété immobilière. Ces éléments démontrent votre intention de revenir après votre séjour.",
  "Notre équipe d'experts suit en permanence l'évolution des politiques d'immigration dans chaque pays. Cette veille nous permet d'adapter nos conseils aux dernières exigences et d'anticiper les changements de procédure.",
  "N'hésitez pas à contacter nos conseillers pour une évaluation gratuite de votre situation. Nous vous proposerons la meilleure stratégie pour maximiser vos chances d'obtenir votre visa dans les meilleurs délais.",
];

export default function BlogPostClient({ slug }: { slug: string }) {
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getBlogPosts().filter((p) => p.slug !== post.slug).slice(0, 3);
  const paragraphs = fullContent[post.slug] || defaultParagraphs;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://emj-consulting.fr/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#050e1c]">
      <ReadingProgress />

      {/* Parallax Hero */}
      <div ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <Image src={post.image} alt={post.title} fill priority className="object-cover" sizes="100vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/50 to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex flex-col justify-end max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-[#D4AF37] text-sm mb-6 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" /> Retour au blog
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-[#0B1F3A] text-xs font-semibold px-3 py-1.5 rounded-full">
              <Tag className="w-3 h-3" />{post.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/60 text-sm"><Calendar className="w-3.5 h-3.5" />{formattedDate}</span>
            <span className="flex items-center gap-1.5 text-white/60 text-sm"><Clock className="w-3.5 h-3.5" />{post.readTime} de lecture</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">{post.title}</h1>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">

          {/* Article */}
          <article>
            {/* Author + Share bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-8 border-b border-gray-100 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image src={post.authorAvatar} alt={post.author} width={52} height={52} className="rounded-full object-cover border-2 border-[#D4AF37]/50" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-[#050e1c]" />
                </div>
                <div>
                  <div className="font-semibold text-[#0B1F3A] dark:text-white">{post.author}</div>
                  <div className="text-gray-400 dark:text-white/40 text-sm">Expert visa & immigration</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 dark:text-white/40 mr-1 flex items-center gap-1.5"><Share2 className="w-3.5 h-3.5" /> Partager</span>
                <a href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all">
                  <FaWhatsapp className="w-4 h-4" />
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all">
                  <FaTwitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Lead */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-xl text-gray-600 dark:text-white/70 leading-relaxed mb-10 font-medium border-l-4 border-[#D4AF37] pl-6">
              {post.excerpt}
            </motion.p>

            {/* Body paragraphs */}
            <div className="space-y-6">
              {paragraphs.map((para, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.5 }}
                  className={`leading-relaxed text-gray-600 dark:text-white/70 ${i === 0 ? "text-lg first-letter:text-5xl first-letter:font-bold first-letter:text-[#D4AF37] first-letter:float-left first-letter:mr-3 first-letter:leading-none" : ""}`}>
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Pull quote */}
            <motion.blockquote initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="my-12 relative">
              <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/20 rounded-full" />
              <div className="pl-8 py-2">
                <p className="text-xl italic text-gray-500 dark:text-white/60 leading-relaxed mb-4">
                  &ldquo;L&apos;expertise d&apos;EMJ-Consulting fait la différence dans chaque demande de visa. Notre approche personnalisée garantit les meilleurs résultats pour nos clients.&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <Image src="/images/team/emlor-joel.jpg" alt="EMLOR Joël" width={36} height={36} className="rounded-full object-cover border border-[#D4AF37]/40" />
                  <span className="text-sm font-semibold text-[#D4AF37]">EMLOR Joël — Fondateur, EMJ-Consulting</span>
                </footer>
              </div>
            </motion.blockquote>

            {/* Key points */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="my-10 rounded-2xl bg-[#0B1F3A]/5 dark:bg-[#D4AF37]/5 border border-[#0B1F3A]/10 dark:border-[#D4AF37]/10 p-6">
              <h3 className="font-poppins font-semibold text-[#0B1F3A] dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" /> Points clés à retenir
              </h3>
              <ul className="space-y-3">
                {post.tags.map((tag) => (
                  <li key={tag} className="flex items-center gap-3 text-gray-600 dark:text-white/70 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                    Maîtrisez les exigences liées à : <span className="font-semibold text-[#0B1F3A] dark:text-white">{tag}</span>
                  </li>
                ))}
                <li className="flex items-center gap-3 text-gray-600 dark:text-white/70 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                  Faites-vous accompagner par des experts pour optimiser vos chances
                </li>
              </ul>
            </motion.div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100 dark:border-white/10">
              {post.tags.map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full border border-[#0B1F3A]/10 dark:border-white/10 text-[#0B1F3A] dark:text-white/70 text-xs font-medium hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-colors cursor-default">
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA Banner */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-14 rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 navy-gradient" />
              <div className="absolute inset-0 opacity-10">
                <Image src="/images/hero/airplane-sky.jpg" alt="" fill className="object-cover" sizes="800px" />
              </div>
              <div className="relative z-10 p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="font-poppins font-bold text-white text-2xl mb-3">Prêt à concrétiser votre projet ?</h3>
                <p className="text-white/60 mb-7 max-w-md mx-auto">
                  Nos experts visa sont disponibles pour analyser votre dossier et vous guider vers le succès.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/appointment" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-bold hover:bg-[#b8941e] transition-all hover:scale-105">
                    Prendre rendez-vous <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all">
                    Nous contacter
                  </Link>
                </div>
              </div>
            </motion.div>
          </article>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24 space-y-6">
              {/* Author card */}
              <div className="rounded-2xl border border-gray-100 dark:border-white/10 p-6 bg-gray-50 dark:bg-[#0B1F3A]/40">
                <h3 className="font-semibold text-[#0B1F3A] dark:text-white text-sm mb-4">À propos de l&apos;auteur</h3>
                <div className="flex flex-col items-center text-center">
                  <Image src={post.authorAvatar} alt={post.author} width={72} height={72} className="rounded-full object-cover border-2 border-[#D4AF37]/40 mb-3" />
                  <div className="font-semibold text-[#0B1F3A] dark:text-white">{post.author}</div>
                  <div className="text-gray-400 dark:text-white/40 text-xs mt-1 mb-3">Expert visa & immigration</div>
                  <p className="text-gray-500 dark:text-white/50 text-xs leading-relaxed">
                    Fondateur d&apos;EMJ-Consulting avec plus de 10 ans d&apos;expérience dans le conseil en immigration et visas pour l&apos;Afrique de l&apos;Ouest.
                  </p>
                </div>
              </div>

              {/* Article info */}
              <div className="rounded-2xl border border-gray-100 dark:border-white/10 p-6">
                <h3 className="font-semibold text-[#0B1F3A] dark:text-white text-sm mb-4">Informations</h3>
                <ul className="space-y-3">
                  {[
                    { icon: Calendar, label: "Publié le", value: formattedDate },
                    { icon: Clock, label: "Lecture", value: post.readTime },
                    { icon: Tag, label: "Catégorie", value: post.category },
                    { icon: BookOpen, label: "Sections", value: `${paragraphs.length} paragraphes` },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3 text-sm">
                      <item.icon className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-gray-400 dark:text-white/40 text-xs">{item.label}</div>
                        <div className="text-gray-700 dark:text-white/70 font-medium">{item.value}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Share */}
              <div className="rounded-2xl border border-gray-100 dark:border-white/10 p-6">
                <h3 className="font-semibold text-[#0B1F3A] dark:text-white text-sm mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#D4AF37]" /> Partager
                </h3>
                <div className="space-y-2">
                  <a href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-sm font-medium">
                    <FaWhatsapp className="w-4 h-4" /> WhatsApp
                  </a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all text-sm font-medium">
                    <FaFacebookF className="w-4 h-4" /> Facebook
                  </a>
                  <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white transition-all text-sm font-medium">
                    <FaTwitter className="w-4 h-4" /> Twitter
                  </a>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl navy-gradient p-6 text-center">
                <div className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-2">Besoin d&apos;aide ?</div>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">Consultation gratuite avec un expert visa</p>
                <Link href="/appointment" className="block w-full py-2.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-bold text-sm hover:bg-[#b8941e] transition-colors">
                  Prendre RDV →
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-100 dark:border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-poppins font-bold text-2xl text-[#0B1F3A] dark:text-white">Articles similaires</h2>
              <Link href="/blog" className="text-[#D4AF37] text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all">
                Voir tout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}>
                  <Link href={`/blog/${p.slug}`} className="group flex flex-col h-full rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:border-[#D4AF37]/40 transition-all bg-white dark:bg-[#0B1F3A]/30">
                    <div className="aspect-video overflow-hidden">
                      <Image src={p.image} alt={p.title} width={400} height={225} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-[#D4AF37] text-xs mb-2 font-medium">{p.category}</span>
                      <h3 className="font-semibold text-[#0B1F3A] dark:text-white text-sm mb-3 group-hover:text-[#D4AF37] transition-colors flex-1 line-clamp-2">{p.title}</h3>
                      <div className="flex items-center justify-between text-xs text-gray-400 dark:text-white/30">
                        <span>{p.readTime} de lecture</span>
                        <span className="flex items-center gap-1 text-[#D4AF37] font-medium">Lire <ArrowRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
