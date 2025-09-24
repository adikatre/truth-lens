# TruthLens: Real-Time Fact Checker
## AI-Powered Web Application for Information Verification

---

## 🎯 **PROJECT SPECIFICATION**

### **Core Vision**
TruthLens is a web application that leverages Chrome's built-in AI APIs to help users verify information in real-time. Users can paste text, upload documents, or analyze URLs to get instant fact-checking assistance with confidence scoring and source recommendations.

### **Target Users**
- **Primary**: Students, researchers, journalists verifying sources
- **Secondary**: Social media users checking viral claims
- **Tertiary**: Professionals preparing reports or presentations

### **Key Features**

#### **MVP (Hackathon Scope)**
1. **Multi-Input Analysis**: Text paste, URL analysis, document upload
2. **AI-Powered Claim Detection**: Automatically identifies verifiable statements
3. **Confidence Dashboard**: Visual scoring system for claim reliability
4. **Source Recommendations**: Suggests authoritative sources for verification
5. **Explanation Generator**: Plain-English breakdowns of why claims are flagged
6. **Export Reports**: Generate shareable fact-check summaries

#### **Post-Hackathon Potential**
- Browser bookmarklet integration
- API for third-party applications
- Collaborative fact-checking workspace
- Historical claim tracking

---

## 🔧 **TECHNICAL IMPLEMENTATION PLAN**

### **Architecture Overview**
```
Frontend (React) → Chrome AI APIs → Analysis Engine → Results Dashboard
```

### **Chrome AI APIs Usage**

#### **1. Prompt API (Core Engine)**
- **Claim Detection**: Identify factual statements requiring verification
- **Context Analysis**: Understand claim implications and scope
- **Source Evaluation**: Assess credibility of provided sources

#### **2. Summarizer API**
- **Document Processing**: Extract key points from long texts
- **Source Summaries**: Condense reference materials

#### **3. Writer API**
- **Report Generation**: Create comprehensive fact-check reports
- **Explanation Creation**: Generate user-friendly explanations

#### **4. Rewriter API**
- **Claim Clarification**: Rephrase ambiguous statements
- **Neutral Phrasing**: Present findings objectively

---

## 📁 **PROJECT STRUCTURE**## 🚀 **DEVELOPMENT TIMELINE (8-10 Hours)**

### **Phase 1: Setup & Foundation (2 hours)**
- [ ] Initialize React application with Vite/Create React App
- [ ] Set up Chrome AI API integration utilities
- [ ] Implement basic UI components and routing
- [ ] Create responsive layout foundation

### **Phase 2: Core AI Integration (3 hours)**
- [ ] Implement Prompt API for claim detection
- [ ] Add Summarizer API for content processing
- [ ] Integrate Writer API for explanations
- [ ] Build confidence scoring algorithm

### **Phase 3: User Interface & Features (2.5 hours)**
- [ ] Complete analysis dashboard with results display
- [ ] Add file upload functionality
- [ ] Implement URL content fetching
- [ ] Create export/sharing features

### **Phase 4: Polish & Testing (2.5 hours)**
- [ ] Error handling and edge cases
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Demo preparation and documentation

---

## 🏗️ **DETAILED IMPLEMENTATION**

### **File Structure**
```
truthlens-webapp/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── InputSection.jsx
│   │   ├── ResultsDashboard.jsx
│   │   ├── ClaimAnalysis.jsx
│   │   └── ConfidenceScore.jsx
│   ├── services/
│   │   ├── aiService.js          # Chrome AI API wrapper
│   │   ├── contentProcessor.js   # Text/URL/File processing
│   │   └── reportGenerator.js    # Export functionality
│   ├── utils/
│   │   ├── claimDetector.js      # Core detection logic
│   │   └── confidenceScorer.js   # Scoring algorithm
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

### **Key Technical Components**

#### **AI Service Integration**
```javascript
// services/aiService.js
class ChromeAIService {
  async detectClaims(text) {
    const session = await window.ai.languageModel.create();
    const prompt = `Analyze this text for factual claims: "${text}"`;
    return await session.prompt(prompt);
  }

  async summarizeContent(text) {
    const session = await window.ai.summarizer.create();
    return await session.summarize(text);
  }

  async generateExplanation(claim, reasoning) {
    const session = await window.ai.writer.create();
    const prompt = `Explain why this claim needs verification: ${claim}`;
    return await session.write(prompt);
  }
}
```

#### **Content Processing Pipeline**
1. **Input Validation**: Check content type and format
2. **Text Extraction**: Parse URLs, documents, or direct text
3. **Claim Detection**: Use Prompt API to identify verifiable statements
4. **Confidence Analysis**: Score each claim based on specificity and verifiability
5. **Source Recommendation**: Generate relevant fact-checking sources
6. **Report Generation**: Compile results into exportable format

---

## 🎯 **SUCCESS METRICS**

### **Technical Goals**
- [ ] Successfully integrate 3+ Chrome AI APIs
- [ ] Process multiple input formats (text, URL, file)
- [ ] Generate accurate confidence scores
- [ ] Export functionality working

### **User Experience Goals**
- [ ] Intuitive interface requiring no tutorial
- [ ] Results generated in under 5 seconds
- [ ] Mobile-responsive design
- [ ] Clear, actionable insights

### **Demo Requirements**
- [ ] Live working application
- [ ] Multiple example analyses prepared
- [ ] Clear explanation of AI integration
- [ ] Scalability roadmap presentation

---

## 🚀 **POST-HACKATHON ROADMAP**

### **Immediate Improvements (Week 1-2)**
- Browser extension version
- API rate limiting and caching
- User account system
- Advanced export formats

### **Medium-term Features (Month 1-3)**
- Integration with external fact-checking databases
- Collaborative verification workspace
- Browser history analysis
- Mobile app development

### **Long-term Vision (3-6 months)**
- Enterprise API offering
- Integration with social media platforms
- Advanced ML models for pattern detection
- Global fact-checking community features

This specification provides a complete roadmap for building TruthLens as a compelling hackathon project that demonstrates the power of Chrome's built-in AI APIs while solving a real-world problem that affects millions of internet users daily.
