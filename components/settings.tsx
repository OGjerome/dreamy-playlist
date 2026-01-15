"use client";

import { useState } from "react";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Palette,
  Download,
  Trash2,
  Save,
  Eye,
  EyeOff,
  CreditCard,
  Crown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    export: true,
    weekly: false,
  });
  const [privacy, setPrivacy] = useState({
    publicProfile: false,
    shareStats: true,
    allowAnalytics: true,
  });

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Effets de lumière de fond */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative p-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white">Paramètres</h1>
          <p className="text-gray-400 mt-2">
            Gérez votre compte et vos préférences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Account */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profil utilisateur
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Gérez vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20 border-2 border-violet-500/30">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback className="bg-gradient-to-r from-violet-500 to-blue-500 text-white text-xl">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
                    >
                      Changer la photo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 bg-transparent"
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-300">
                      Prénom
                    </Label>
                    <Input
                      id="firstName"
                      defaultValue="John"
                      className="bg-gray-800/50 border-violet-500/30 text-white focus:border-violet-400 focus:ring-violet-400/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-300">
                      Nom
                    </Label>
                    <Input
                      id="lastName"
                      defaultValue="Doe"
                      className="bg-gray-800/50 border-violet-500/30 text-white focus:border-violet-400 focus:ring-violet-400/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john@example.com"
                    className="bg-gray-800/50 border-violet-500/30 text-white focus:border-violet-400 focus:ring-violet-400/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-300">
                    Bio (optionnel)
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Parlez-nous de vos goûts musicaux..."
                    className="bg-gray-800/50 border-violet-500/30 text-white placeholder:text-gray-500 focus:border-violet-400 focus:ring-violet-400/20"
                  />
                </div>

                <Button className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder les modifications
                </Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Sécurité
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Gérez votre mot de passe et la sécurité de votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-gray-300">
                    Mot de passe actuel
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      className="bg-gray-800/50 border-violet-500/30 text-white focus:border-violet-400 focus:ring-violet-400/20 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-gray-300">
                    Nouveau mot de passe
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="bg-gray-800/50 border-violet-500/30 text-white focus:border-violet-400 focus:ring-violet-400/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300">
                    Confirmer le nouveau mot de passe
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="bg-gray-800/50 border-violet-500/30 text-white focus:border-violet-400 focus:ring-violet-400/20"
                  />
                </div>

                <Button
                  variant="outline"
                  className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
                >
                  Changer le mot de passe
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Choisissez comment vous souhaitez être notifié
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label
                      htmlFor="email-notifications"
                      className="text-gray-300"
                    >
                      Notifications par email
                    </Label>
                    <p className="text-sm text-gray-500">
                      Recevez des emails pour les mises à jour importantes
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, email: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label
                      htmlFor="push-notifications"
                      className="text-gray-300"
                    >
                      Notifications push
                    </Label>
                    <p className="text-sm text-gray-500">
                      Notifications dans le navigateur
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, push: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label
                      htmlFor="export-notifications"
                      className="text-gray-300"
                    >
                      Notifications d&apos;export
                    </Label>
                    <p className="text-sm text-gray-500">
                      Soyez notifié quand vos exports sont terminés
                    </p>
                  </div>
                  <Switch
                    id="export-notifications"
                    checked={notifications.export}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, export: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label
                      htmlFor="weekly-notifications"
                      className="text-gray-300"
                    >
                      Résumé hebdomadaire
                    </Label>
                    <p className="text-sm text-gray-500">
                      Recevez un résumé de votre activité chaque semaine
                    </p>
                  </div>
                  <Switch
                    id="weekly-notifications"
                    checked={notifications.weekly}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, weekly: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Confidentialité
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Contrôlez la visibilité de vos données
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="public-profile" className="text-gray-300">
                      Profil public
                    </Label>
                    <p className="text-sm text-gray-500">
                      Permettre aux autres de voir votre profil
                    </p>
                  </div>
                  <Switch
                    id="public-profile"
                    checked={privacy.publicProfile}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, publicProfile: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="share-stats" className="text-gray-300">
                      Partager les statistiques
                    </Label>
                    <p className="text-sm text-gray-500">
                      Permettre le partage de vos statistiques d&apos;écoute
                    </p>
                  </div>
                  <Switch
                    id="share-stats"
                    checked={privacy.shareStats}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, shareStats: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics" className="text-gray-300">
                      Données analytiques
                    </Label>
                    <p className="text-sm text-gray-500">
                      Aider à améliorer DreamyPlaylist avec vos données
                      d&apos;usage
                    </p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={privacy.allowAnalytics}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, allowAnalytics: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Subscription & Danger Zone */}
          <div className="space-y-6">
            {/* Subscription */}
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  Abonnement Premium
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 mb-2">
                    Premium Actif
                  </Badge>
                  <p className="text-gray-400 text-sm">
                    Renouvellement le 15 janvier 2025
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Plan:</span>
                    <span className="text-white">Premium Mensuel</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Prix:</span>
                    <span className="text-white">9,99€/mois</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Plateformes:</span>
                    <span className="text-white">Illimitées</span>
                  </div>
                </div>

                <Separator className="bg-violet-500/20" />

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Gérer l&apos;abonnement
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-500/30 text-gray-400 hover:bg-gray-500/20 hover:text-white bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger la facture
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Préférences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-gray-300">
                    Langue
                  </Label>
                  <Select defaultValue="fr">
                    <SelectTrigger className="bg-gray-800/50 border-violet-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-violet-500/30">
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-gray-300">
                    Fuseau horaire
                  </Label>
                  <Select defaultValue="europe/paris">
                    <SelectTrigger className="bg-gray-800/50 border-violet-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-violet-500/30">
                      <SelectItem value="europe/paris">Europe/Paris</SelectItem>
                      <SelectItem value="america/new_york">
                        America/New_York
                      </SelectItem>
                      <SelectItem value="asia/tokyo">Asia/Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="export-format" className="text-gray-300">
                    Format d&apos;export par défaut
                  </Label>
                  <Select defaultValue="m3u">
                    <SelectTrigger className="bg-gray-800/50 border-violet-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-violet-500/30">
                      <SelectItem value="m3u">M3U</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-red-900/20 border-red-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Zone dangereuse
                </CardTitle>
                <CardDescription className="text-red-300/70">
                  Actions irréversibles sur votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 bg-transparent"
                    >
                      Supprimer toutes les playlists
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-red-500/30">
                    <DialogHeader>
                      <DialogTitle className="text-red-400">
                        Confirmer la suppression
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Cette action supprimera définitivement toutes vos
                        playlists. Cette action est irréversible.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border-gray-500/30 text-gray-400 hover:bg-gray-500/20 bg-transparent"
                      >
                        Annuler
                      </Button>
                      <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                        Supprimer tout
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 bg-transparent"
                    >
                      Supprimer le compte
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-red-500/30">
                    <DialogHeader>
                      <DialogTitle className="text-red-400">
                        Supprimer le compte
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Cette action supprimera définitivement votre compte et
                        toutes vos données. Cette action est irréversible.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Tapez 'SUPPRIMER' pour confirmer"
                        className="bg-gray-800/50 border-red-500/30 text-white focus:border-red-400 focus:ring-red-400/20"
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 border-gray-500/30 text-gray-400 hover:bg-gray-500/20 bg-transparent"
                        >
                          Annuler
                        </Button>
                        <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                          Supprimer le compte
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
