function StatusPage({ status }) {
    return (
        <div className="status-section">
            <div className="hero">
                <h2>System Status</h2>
                <p>Real-time health monitoring of ShopSmart infrastructure</p>
            </div>

            <div className="status-grid">
                <div className="status-card">
                    <h4>API Status</h4>
                    <div className={`value ${status ? 'ok' : ''}`}>
                        {status ? '✅ Operational' : '❌ Offline'}
                    </div>
                </div>

                <div className="status-card">
                    <h4>Response Message</h4>
                    <div className="value" style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
                        {status ? status.message : 'Unable to reach backend'}
                    </div>
                </div>

                <div className="status-card">
                    <h4>Last Checked</h4>
                    <div className="value" style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
                        {status ? new Date(status.timestamp).toLocaleString() : '—'}
                    </div>
                </div>

                <div className="status-card">
                    <h4>Platform</h4>
                    <div className="value" style={{ fontSize: '1rem', color: 'var(--accent)' }}>
                        AWS ECS Fargate
                    </div>
                </div>

                <div className="status-card">
                    <h4>Region</h4>
                    <div className="value" style={{ fontSize: '1rem', color: 'var(--accent)' }}>
                        us-east-1
                    </div>
                </div>

                <div className="status-card">
                    <h4>Load Balancer</h4>
                    <div className="value" style={{ fontSize: '1rem', color: 'var(--success)' }}>
                        ALB Active
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatusPage;
