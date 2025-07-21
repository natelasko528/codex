// TODO: Implement Orchestrator logic
const TaskQueue = require('./TaskQueue');
const AgentRegistry = require('./AgentRegistry');

class Orchestrator {
    constructor(taskQueue, agentRegistry) {
        if (!(taskQueue instanceof TaskQueue) || !(agentRegistry instanceof AgentRegistry)) {
            throw new Error("Orchestrator must be initialized with TaskQueue and AgentRegistry instances.");
        }
        this.taskQueue = taskQueue;
        this.agentRegistry = agentRegistry;
        this.assignedTasks = new Map(); // Map<agentId, taskId> to track assignments
        this.orchestrationInterval = null;
        this.TASK_ASSIGNMENT_INTERVAL_MS = 5000; // Check for tasks to assign every 5 seconds
    }

    assignTasks() {
        console.log("Attempting to assign tasks...");
        const availableAgents = this.agentRegistry.getAvailableAgents();
        
        if (availableAgents.length === 0) {
            console.log("No agents available for task assignment.");
            return;
        }

        // Basic round-robin assignment
        // Assign tasks to agents that are not already assigned a task by this orchestrator
        for (const agent of availableAgents) {
            if (!this.assignedTasks.has(agent.id)) { // Check if the agent is already assigned a task by this orchestrator
                const task = this.taskQueue.getTask();
                if (task) {
                    this.agentRegistry.updateAgentStatus(agent.id, 'busy');
                    this.assignedTasks.set(agent.id, task.id);
                    console.log(`Assigning task ${task.id} to agent ${agent.id}`);
                    // In a real system, you would send this task payload to the agent.
                    // For now, we simulate it by just logging and updating statuses.
                    
                    // Simulate task completion after a delay
                    setTimeout(() => {
                        this.taskCompleted(agent.id, task.id);
                    }, Math.random() * 10000 + 5000); // Simulate 5-15 seconds task duration
                } else {
                    console.log("No pending tasks available to assign.");
                    break; // No more tasks, stop assigning for this round
                }
            }
        }
    }

    taskCompleted(agentId, taskId) {
        console.log(`Task ${taskId} completed by agent ${agentId}.`);
        this.taskQueue.updateTaskStatus(taskId, 'completed');
        this.agentRegistry.updateAgentStatus(agentId, 'idle');
        this.assignedTasks.delete(agentId); // Remove from assigned tasks
    }

    taskFailed(agentId, taskId, errorInfo) {
        console.error(`Task ${taskId} failed on agent ${agentId}:`, errorInfo);
        this.taskQueue.updateTaskStatus(taskId, 'failed');
        this.agentRegistry.updateAgentStatus(agentId, 'idle'); // Agent might be idle or offline depending on error
        this.assignedTasks.delete(agentId);
    }

    startOrchestration() {
        if (this.orchestrationInterval) {
            console.log("Orchestration is already running.");
            return;
        }
        console.log(`Starting orchestration with an interval of ${this.TASK_ASSIGNMENT_INTERVAL_MS}ms.`);
        this.orchestrationInterval = setInterval(() => this.assignTasks(), this.TASK_ASSIGNMENT_INTERVAL_MS);
    }

    stopOrchestration() {
        if (this.orchestrationInterval) {
            clearInterval(this.orchestrationInterval);
            this.orchestrationInterval = null;
            console.log("Orchestration stopped.");
        }
    }
}

module.exports = {
    Orchestrator,
    TaskQueue,
    AgentRegistry
};