export interface HistoryRecord {
 id: string;
 fieldId: string;
 type: 'text' | 'image';
 oldValue: string;
 newValue: string;
 user: string;
 timestamp: string;
}

export function logEditHistory(fieldId: string, type: 'text' | 'image', oldValue: string, newValue: string, user: string) {
 const record: HistoryRecord = {
 id: Math.random().toString(36).substring(2, 9),
 fieldId,
 type,
 oldValue,
 newValue,
 user,
 timestamp: new Date().toISOString()
 };
 
 const historyRaw = localStorage.getItem('cms_history');
 let history: HistoryRecord[] = [];
 if (historyRaw) {
 try {
 history = JSON.parse(historyRaw);
 } catch (e) {}
 }
 history.unshift(record);
 localStorage.setItem('cms_history', JSON.stringify(history));
}

export function getEditHistory(): HistoryRecord[] {
 const historyRaw = localStorage.getItem('cms_history');
 if (historyRaw) {
 try {
 return JSON.parse(historyRaw);
 } catch (e) {}
 }
 return [];
}
