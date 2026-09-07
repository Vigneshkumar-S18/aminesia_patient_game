import React from 'react';
import { Target, Clock, Brain, Activity, ArrowDown, ArrowRight } from 'lucide-react';
import './Analytics.css';

export default function Analytics() {
  return (
    <div className="analytics-page page-content">
      <header className="page-header vault-header">
        <div>
          <h1>Cognitive Journey</h1>
          <p className="text-muted text-lg">Understand Asha's personalized sessions and AI adaptation.</p>
        </div>
      </header>

      <div className="analytics-top-grid mb-4">
        <div className="card today-summary-card">
          <h3 className="mb-4">Today</h3>
          <div className="metrics-grid">
            <div className="metric">
              <Brain className="text-primary mb-2" size={28} />
              <span className="metric-val">8</span>
              <span className="metric-lbl">Tasks Completed</span>
            </div>
            <div className="metric">
              <Clock className="text-secondary mb-2" size={28} />
              <span className="metric-val">16</span>
              <span className="metric-lbl">Minutes</span>
            </div>
            <div className="metric">
              <Target className="text-primary mb-2" size={28} />
              <span className="metric-val">82%</span>
              <span className="metric-lbl">Successful</span>
            </div>
            <div className="metric">
              <Activity className="text-danger mb-2" size={28} />
              <span className="metric-val">High</span>
              <span className="metric-lbl">Engagement</span>
            </div>
          </div>
        </div>

        <div className="card categories-card">
          <h3 className="mb-4">Cognitive Categories</h3>
          
          <div className="category-bars">
            <div className="cat-row">
              <span className="cat-label">Recognition</span>
              <div className="progress-bar"><div className="fill bg-primary" style={{width: '82%'}}></div></div>
              <span className="cat-percent">82%</span>
            </div>
            <div className="cat-row">
              <span className="cat-label">Recall</span>
              <div className="progress-bar"><div className="fill bg-warning" style={{width: '64%'}}></div></div>
              <span className="cat-percent">64%</span>
            </div>
            <div className="cat-row">
              <span className="cat-label">Attention</span>
              <div className="progress-bar"><div className="fill bg-secondary" style={{width: '71%'}}></div></div>
              <span className="cat-percent">71%</span>
            </div>
            <div className="cat-row">
              <span className="cat-label">Sequence</span>
              <div className="progress-bar"><div className="fill bg-primary" style={{width: '89%'}}></div></div>
              <span className="cat-percent">89%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-bottom-grid">
        <div className="card ai-adaptation-card">
          <div className="adaptation-header mb-4">
            <h3>Today's AI Adaptation</h3>
            <span className="badge bg-primary-light text-primary">System insight</span>
          </div>

          <div className="adaptation-flow">
            <div className="flow-step">
              <h4 className="text-muted text-sm">Previous Session</h4>
              <p className="font-medium mt-1">Patient struggled with abstract sequence tasks.</p>
            </div>
            
            <div className="flow-arrow"><ArrowDown size={20} className="text-muted" /></div>
            
            <div className="flow-step ai-decision">
              <h4 className="text-primary text-sm">AI Decision</h4>
              <ul className="decision-list mt-1">
                <li>Increase familiar content</li>
                <li>Reduce task complexity</li>
                <li>Add voice guidance</li>
              </ul>
            </div>

            <div className="flow-arrow"><ArrowDown size={20} className="text-muted" /></div>

            <div className="flow-step">
              <h4 className="text-muted text-sm">Current Session</h4>
              <p className="font-medium mt-1">Family-photo recognition + familiar voice prompts.</p>
            </div>
          </div>
        </div>

        <div className="card timeline-card">
          <h3 className="mb-4">Journey Timeline</h3>
          
          <div className="journey-timeline">
            <div className="j-item">
              <div className="j-time">10:02</div>
              <div className="j-details">
                <span className="font-medium">Family Recognition</span>
                <span className="j-status text-secondary">✓ Completed</span>
              </div>
            </div>
            <div className="j-item">
              <div className="j-time">10:05</div>
              <div className="j-details">
                <span className="font-medium">Place Recognition</span>
                <span className="j-status text-secondary">✓ Completed</span>
              </div>
            </div>
            <div className="j-item">
              <div className="j-time">10:09</div>
              <div className="j-details">
                <span className="font-medium">Familiar Sound</span>
                <span className="j-status text-secondary">✓ Completed</span>
              </div>
            </div>
            <div className="j-item">
              <div className="j-time">10:13</div>
              <div className="j-details">
                <span className="font-medium">Object Sequence</span>
                <span className="j-status text-warning">○ Assisted</span>
              </div>
            </div>
            <div className="j-item final-j-item">
              <div className="j-time">10:17</div>
              <div className="j-details">
                <span className="font-medium text-primary">❤️ Journey Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
