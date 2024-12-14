module.exports = {
  apps: [
    {
      name: 'OBS-Pomodoro', // Nom de l'application
      script: 'npm', // Point d'entrée SSR
      args: 'run dev', // Arguments du script
      instances: '1', // Utilise tous les cœurs disponibles
      exec_mode: 'cluster',
    },
  ],
};
