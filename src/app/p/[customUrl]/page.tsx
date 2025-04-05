// import { connectDB } from '@/lib/dbConn';
// import Portfolio from '@/modal/Portfolio';
// import { notFound } from 'next/navigation';
// import { Metadata } from 'next';



// // Option 2: If the above doesn't work, try with more precise relative paths
// import Template1 from '../../allTemplates/templateOne';
// import Template2 from '../../../allTemplates/templateTwo';
// import Template3 from '../../../allTemplates/templateThree';
// import Template4 from '../../../allTemplates/templateFour';

// // Generate metadata for the page
// export async function generateMetadata({ 
//   params 
// }: { 
//   params: { customUrl: string } 
// }): Promise<Metadata> {
//   // Connect to DB
//   await connectDB();
  
//   // Find the portfolio by custom URL
//   const portfolio = await Portfolio.findOne<{ title?: string; description?: string; templateType: string } & Record<string, any>>({ 
//     customUrl: params.customUrl,
//     isPublic: true
//   }).lean();
  
//   if (!portfolio) {
//     return {
//       title: 'Portfolio Not Found',
//       description: 'The requested portfolio could not be found'
//     };
//   }
  
//   return {
//     title: portfolio.title || 'Portfolio',
//     description: portfolio.description || 'View this professional portfolio',
//   };
// }

// export default async function PortfolioPage({ 
//   params 
// }: { 
//   params: { customUrl: string } 
// }) {
//   // Connect to DB
//   await connectDB();
  
//   // Find the portfolio by custom URL
//   const portfolio = await Portfolio.findOne<{ title?: string; description?: string; templateType: string } & Record<string, any>>({ 
//     customUrl: params.customUrl,
//     isPublic: true
//   }).lean();
  
//   if (!portfolio) {
//     notFound();
//   }
  
//   // Convert Mongoose document to plain object
//   const portfolioData = JSON.parse(JSON.stringify(portfolio));
  
//   // Render the appropriate template based on the template type
//   switch (portfolioData.templateType) {
//     case 'template1':
//       return <Template1 data={portfolioData} />;
//     case 'template2':
//       return <Template2 data={portfolioData} />;
//     case 'template3':
//       return <Template3 data={portfolioData} />;
//     case 'template4':
//       return <Template4 data={portfolioData} />;
//     // case 'template5':
//     //   return <Template5 data={portfolioData} />;
//     // case 'template6':
//     //   return <Template6 data={portfolioData} />;
//     // case 'template7':
//     //   return <Template7 data={portfolioData} />;
//     default:
//       return <Template1 data={portfolioData} />; // Default to template1
//   }
// }