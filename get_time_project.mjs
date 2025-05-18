import fetch from 'node-fetch';

// Webhook i ID grupy roboczej projektu PROBIT
const webhookUrl = 'https://probit.bitrix24.pl/rest/15/36orbmioq126p214/';
const groupId = 51;

// Pobierz wszystkie zadania z projektu
async function getTasksInGroup(groupId) {
  const response = await fetch(`${webhookUrl}tasks.task.list`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filter: { GROUP_ID: groupId },
      select: ['ID'],
    }),
  });
  const data = await response.json();
  return data.result.tasks.map(task => task.id);
}

// Pobierz czas poświęcony na dane zadanie
async function getElapsedTime(taskId) {
  const response = await fetch(`${webhookUrl}task.elapseditem.getlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ TASKID: taskId }),
  });
  const data = await response.json();
  if (!data.result) return 0;
  return data.result.reduce((sum, entry) => sum + parseInt(entry.MINUTES), 0);
}

// Główna funkcja
(async () => {
  try {
    const taskIds = await getTasksInGroup(groupId);
    let totalMinutes = 0;

    for (const taskId of taskIds) {
      const minutes = await getElapsedTime(taskId);
      console.log(`Zadanie ${taskId}: ${minutes} minut`);
      totalMinutes += minutes;
    }

    console.log(`\nŁączny czas w projekcie (grupa ${groupId}): ${totalMinutes} minut (${(totalMinutes / 60).toFixed(2)} godziny)`);
  } catch (error) {
    console.error('Błąd:', error);
  }
})();