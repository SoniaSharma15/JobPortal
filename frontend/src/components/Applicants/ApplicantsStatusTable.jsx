import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ApplicantsStatusTables() {
  const { applicants } = useSelector((store) => store.application);
  const navigate = useNavigate();
  const pending = applicants?.applications?.filter(app => app.status === "pending") || [];
  const accepted = applicants?.applications?.filter(app => app.status === "accepted") || [];
  const rejected = applicants?.applications?.filter(app => app.status === "rejected") || [];

  const maxLength = Math.max(pending.length, accepted.length, rejected.length);

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4">Applicants by Status</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pending</TableHead>
            <TableHead>Accepted</TableHead>
            <TableHead>Rejected</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: maxLength }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>{pending[index]?.applicant?.fullname || "—"}</TableCell>
              <TableCell>{accepted[index]?.applicant?.fullname || "—" }{accepted[index] && <Button variant="ghost" onClick={()=>{navigate(`/admin/emailForm/${accepted[index]?.applicant?.email}`)}}><Mail/></Button>}</TableCell>
              <TableCell>{rejected[index]?.applicant?.fullname || "—"}</TableCell>
            </TableRow>
          ))}
          {/* Footer Row for Counts */}
          <TableRow className="font-semibold bg-gray-100">
            <TableCell>Total: {pending.length}</TableCell>
            <TableCell>Total: {accepted.length}</TableCell>
            <TableCell>Total: {rejected.length}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsStatusTables;