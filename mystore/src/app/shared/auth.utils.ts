export function isTokenValid(token: string | null | undefined): boolean {
    if (!token) return false;
  
    const payload = token.split('.')[1];
    try {
      const decoded = JSON.parse(atob(payload));
      const exp = decoded.exp;
      const now = Math.floor(Date.now() / 1000);
      return exp > now;
    } catch (e) {
      return false;
    }
  }