"use client";

import {
  ArrowRight,
  Download,
  Heart,
  Music,
  Share2,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            DreamyPlaylist
          </span>
        </div>
        <Button
          asChild
          className="bg-gray-900/50 border border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white backdrop-blur-sm"
        >
          <Link href="/dashboard">Essayez DreamyPlaylist</Link>
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-6 mb-12">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Créez, gérez et exportez vos
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                playlists sur toutes vos
              </span>
              <br />
              plateformes
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Recherchez vos morceaux favoris, créez des playlists sans
              contrainte et exportez-les où vous voulez.
            </p>
          </div>
          <div className="relative max-w-4xl  mx-auto">
            <Image
              src="/hero.png"
              alt="Summer Vibes 2025"
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-3xl border-4 border-white/20"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-400">
              La meilleure façon de créer et gérer vos playlists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">
                  Multi-plateforme ultra-rapide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Ajoutez des morceaux de différentes plateformes en un clic.
                  Spotify, Apple Music, Deezer - tout est connecté.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">
                  Exportation illimitée
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Diffusez vos playlists où vous voulez, sans limite. Compatible
                  avec toutes vos plateformes préférées.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">
                  Synchronisation & gestion avancée
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Version Premium : Modifiez, organisez et synchronisez toutes
                  vos playlists en temps réel sur chaque plateforme.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">
                  Partage ultra simple
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Un seul lien pour partager votre playlist avec le monde. Vos
                  amis peuvent &apos;écouter sur leur plateforme préférée.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="relative z-10 py-20 px-6 bg-gray-900/30"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Créez et exportez des playlists parfaites
            </h2>
            <p className="text-xl text-gray-400">en 3 étapes simples</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <div className="bg-violet-500/20 rounded-2xl p-8 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Music className="w-12 h-12 text-violet-400 mx-auto mb-4" />
                    <p className="text-gray-300">
                      Interface de recherche intuitive
                    </p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Recherchez</h3>
              <p className="text-gray-400">
                Trouvez n&apos;importe quelle chanson, sur n&apos;importe quelle
                plateforme. Plus besoin de jongler entre vos apps. Trouvez le
                bon morceau, sur la bonne plateforme, en quelques secondes.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <div className="bg-blue-500/20 rounded-2xl p-8 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Heart className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-300">
                      Créateur de playlist intelligent
                    </p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Construisez votre playlist parfaite
              </h3>
              <p className="text-gray-400">
                Ajoutez et mixez des morceaux de plusieurs plateformes sans
                effort.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <div className="bg-green-500/20 rounded-2xl p-8 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Download className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-300">
                      Export multi-plateforme instantané
                    </p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Un clic, et votre playlist est disponible partout
              </h3>
              <p className="text-gray-400">
                Un seul clic pour envoyer votre playlist sur toutes vos
                plateformes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-20 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Plan tarifaire
            </h2>
            <p className="text-xl text-gray-400">
              Choisissez l&apos;offre qui vous convient le mieux
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan Gratuit */}
            <Card className="bg-gray-900/50 border-gray-500/30 backdrop-blur-sm relative">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <CardTitle className="text-2xl text-white mb-2">
                  Gratuit
                </CardTitle>
                <div className="text-4xl font-bold text-white mb-2">0€</div>
                <p className="text-gray-400">Pour commencer</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✓</span>
                    </div>
                    <span className="text-gray-300">
                      Création et export vers Spotify
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✗</span>
                    </div>
                    <span className="text-gray-400">
                      Gestion & synchronisation
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✗</span>
                    </div>
                    <span className="text-gray-400">Dashboard centralisé</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✗</span>
                    </div>
                    <span className="text-gray-400">
                      Statistiques & insights
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✗</span>
                    </div>
                    <span className="text-gray-400">
                      Playlists collaboratives
                    </span>
                  </div>
                </div>
                <Button
                  asChild
                  className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white border-0"
                >
                  <Link href="/dashboard">🆓 Tester Gratuitement</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Plan Premium */}
            <Card className="bg-gradient-to-br from-violet-500/20 to-blue-500/20 border-violet-500/50 backdrop-blur-sm relative">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💎</span>
                </div>
                <CardTitle className="text-2xl text-white mb-2">
                  Premium
                </CardTitle>
                <div className="text-4xl font-bold text-white mb-2">9,99€</div>
                <p className="text-gray-300">par mois ou 99€/an</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✓</span>
                    </div>
                    <span className="text-white font-medium">
                      Illimité & plus rapide
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✓</span>
                    </div>
                    <span className="text-white">
                      Auto-sync sur toutes plateformes
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✓</span>
                    </div>
                    <span className="text-white">
                      Vue et modifications en temps réel
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✓</span>
                    </div>
                    <span className="text-white">
                      Analyse des morceaux les plus populaires
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✓</span>
                    </div>
                    <span className="text-white">
                      Ajout en live multi-utilisateurs
                    </span>
                  </div>
                </div>
                <Button
                  asChild
                  className="w-full mt-6 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-violet-500/30"
                >
                  <Link href="/dashboard">🚀 Passer au Premium</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 pb-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à révolutionner vos playlists ?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Rejoignez des milliers d&apos;utilisateurs et commencez à créer des
            playlists incroyables dès aujourd&apos;hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-violet-500/30 text-lg px-8 py-6"
            >
              <Link href="/dashboard">
                Commencer gratuitement
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent text-lg px-8 py-6"
            >
              <Link href="#features">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                DreamyPlaylist
              </span>
            </div>
            <div className="flex gap-6 text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                À propos
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Conditions
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
          <div className="mt-8 border-gray-800 text-end text-sm text-gray-400">
            <p>&copy; 2025 DreamyPlaylist. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
