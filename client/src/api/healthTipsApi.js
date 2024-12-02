export const getHealthTips = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Dummy health tips - Replace with actual API call
  return [
    "Drink at least 8 glasses of water daily",
    "Get 7-9 hours of sleep each night",
    "Exercise for 30 minutes daily",
    "Eat plenty of fruits and vegetables",
    "Practice mindfulness or meditation",
    "Take regular breaks while working",
    "Maintain good posture",
    "Stay up to date with vaccinations"
  ];
};