export const formatHeight = (heightInCm: any) => {
    return (heightInCm / 100).toFixed(2) + ' m';
};

export const formatWeight = (weightInKg: any) => {
    return weightInKg + ' kg'; 
};