// TODO: Implement Agent Registry logic
class AgentRegistry {
    constructor() {
        this.agents = new Map(); // Map<agentId,agentInfo>
        this.agentIdCounter = 0;
    }

    registerAgent(agentInfo) {
        const agentId = `agent_${this.agentIdCounter++}`;
        this.agents.set(agentId, {
            ...agentInfo,
            id: agentId,
            registeredAt: new Date(),
            status: 'idle', // 'idle', 'busy', 'offline'
        });
        console.log(`Agent ${agentId} registered with info:`, agentInfo);
        return agentId;
    }

    getAgent(agentId) {
        return this.agents.get(agentId);
    }

    getAllAgents() {
        return Array.from(this.agents.values());
    }

    getAvailableAgents() {
        return this.getAllAgents().filter(agent => agent.status === 'idle');
    }

    updateAgentStatus(agentId, newStatus) {
        const agent = this.agents.get(agentId);
        if (agent) {
            agent.status = newStatus;
            console.log(`Agent ${agentId} status updated to ${newStatus}.`);
        } else {
            console.warn(`Agent ${agentId} not found.`);
        }
    }

    unregisterAgent(agentId) {
        const deleted = this.agents.delete(agentId);
        if (deleted) {
            console.log(`Agent ${agentId} unregistered.`);
        } else {
            console.warn(`Agent ${agentId} not found for unregistration.`);
        }
        return deleted;
    }
}

module.exports = AgentRegistry;