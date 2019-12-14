# Execute in Mac using: ./EXFiles/scripts/CreateOrg.sh
echo "*** Creating scratch Org..."
sfdx force:org:create -f config/project-scratch-def.json --setdefaultusername --setalias soQRCode -d 1
echo "*** Opening scratch Org..."
sfdx force:org:open
echo "*** Pushing metadata to scratch Org..."
sfdx force:source:push --json
# echo "*** Assigning permission set to your user..."
# sfdx force:user:permset:assign --permsetname Certification
echo "*** Creating required users..."
sfdx force:apex:execute -f ./@ELTOROIT/scripts/ExecuteAnonymousApex.txt
# echo "*** Creating data using ETCopyData plugin"
# sfdx ETCopyData:export -c EXFiles/data --loglevel warn
# sfdx ETCopyData:import -c EXFiles/data --loglevel warn
echo "*** Generate user's password"
sfdx force:user:password:generate
sfdx force:user:display
