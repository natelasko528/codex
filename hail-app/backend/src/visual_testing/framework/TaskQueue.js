// TODO: Implement Task Queue logic
class TaskQueue {
    constructor() {
        this.queue = [];
        this.taskIdCounter = 0;
    }

    addTask(taskPayload) {
        const taskId = this.taskIdCounter++;
        const newTask = {
            id: taskId,
            payload: taskPayload,
            status: 'pending', // 'pending', 'in_progress', 'completed', 'failed'
            createdAt: new Date(),
        };
        this.queue.push(newTask);
        // TODO: Implement prioritization logic later if needed
        console.log(`Task ${taskId} added to queue. Payload:`, taskPayload);
        return taskId;
    }

    getTask() {
        // Simple FIFO for now, needs prioritization logic
        if (this.queue.length === 0) {
            return null;
        }
        // Find the first pending task
        const taskIndex = this.queue.findIndex(task => task.status === 'pending');
        if (taskIndex === -1) {
            return null; // No pending tasks
        }
        const task = this.queue.splice(taskIndex, 1)[0];
        task.status = 'in_progress';
        console.log(`Task ${task.id} retrieved from queue.`);
        return task;
    }

    updateTaskStatus(taskId, newStatus) {
        const task = this.queue.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;
            console.log(`Task ${taskId} status updated to ${newStatus}.`);
        } else {
            console.warn(`Task ${taskId} not found.`);
        }
    }

    // Other methods like peek, increasePriority, etc. can be added later.
}

module.exports = TaskQueue;