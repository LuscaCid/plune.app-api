# 📦 Plune

**Plune** is a web-based platform for modeling, configuring, and executing **custom workflows**, including dynamic forms, approval stages, conditional logic, and external integrations.

---

## ✨ Features

- ✅ Visual workflow creation with drag-and-drop diagrams  
- ✅ Dynamic forms with customizable fields  
- ✅ Approval steps with multiple approvers  
- ✅ Conditional nodes based on submitted values  
- ✅ Independent flow executions with version safety  
- ✅ Webhook integration support  
- ✅ Runtime validations for fields and branches  
- ✅ Multi-organization support  

---

## 🧱 Tech Stack

- **Frontend**: React + Vite + React Flow + Tailwind CSS  
- **Backend**: Node.js + Drizzle ORM + PostgreSQL (`JSONB`)  
- **Storage**: PostgreSQL (relational + dynamic field support)  
- **ORM**: Drizzle with typed schema and native PostgreSQL JSONB support  

---

## 📂 Project Structure

plune/
├── frontend/ # React app with drag & drop workflow builder
│ ├── components/ # UI components and custom hooks
│ ├── pages/ # Route-based views (dashboard, builder, flows)
│ └── lib/ # Utilities and API clients
│
├── backend/ # Node.js with Fastify API with Mongoose ORM
│ ├── schema/ # Mongoose schema definitions (flows, forms, responses)
│ ├── routes/ # REST or tRPC endpoints
│ └── db/ # PostgreSQL connection and migrations
│
└── README.md # Project overview


# Clone the repo
git clone [https://github.com/your-org/plune.git](https://github.com/LuscaCid/plune.app-api)
cd plune

# Install dependencies
npm install

# Run dev servers
npm run dev
